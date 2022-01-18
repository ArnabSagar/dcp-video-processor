const SCHEDULER_URL = new URL('https://scheduler.distributed.computer');
const fs = require("fs");
const ffmpeg = require('ffmpeg');
const getPixels = require("get-pixels")
var savePixels = require("save-pixels")
const { spawn } = require('child_process');






function convertFrameToPixels(myBuffer){ 

    let someConst;
    getPixels(myBuffer, "image/jpeg", function(err, pixels){
        if (err){        
            // return err;
            throw err;
        } else {
            someConst = pixels          
        }
    });
    return someConst;

}


async function getPixelData(path){

    var myBuffer = fs.readFileSync(`${path}`);
    var framePixelData = await convertFrameToPixels(myBuffer)
    return framePixelData

}


function createVideo(pathToFrames){

    const ls = spawn('ffmpeg', ['-i', `${pathToFrames}/output_%d.jpg`, '-vcodec', 'mpeg4', 'final.avi']);
    
    ls.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });
    
    ls.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });
    
    ls.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
    });
    
}


function workFunction(pixelData){

    // debugger
    // console.log(pixelData);
    progress();
    // pixelData = pixelData.data
    for(var i = 0; i<pixelData.length; i=i+4){
        var total = (pixelData[i] + pixelData[i+1] + pixelData[i+2])/3
        pixelData[i] = total
        pixelData[i+1] = total
        pixelData[i+2] = total
        // console.log(i);
    }

    return pixelData
}

function createFrames(pathToVideo){

    return new Promise((resolve,reject)=>{
        try {
            var process = new ffmpeg(pathToVideo);
            process.then(function (video) {
                video.fnExtractFrameToJPG('./frames', {
                    every_n_frames : 1,
                    file_name : `%s_frame`
                }, function (error, files) {
                    if (!error){
                        console.log('Frames saved');
                        resolve()
                    }
                    else{
                        console.log('Error! Frames not saved.\n' + error);
                        reject()
                    }
                });
            }, function (err) {
                console.log('Error: ' + err);
                reject()
            });
        } catch (e) {
            console.log(e.code);
            console.log(e.msg);
            reject()
        }
 
    });

}


async function main(){    

    let pathToVideo = "testvid1.mp4"
    let pathToFrames = "./frames"
    let pathToConvertedFrames = "./outputSet"
    let framesObjects = [];         
    let framesPixelsArray = []

    /* INPUT SET */  
    // await createFrames(pathToVideo)//Split the video into frames
    let frames = fs.readdirSync(pathToFrames)    
    for(const frame of frames){             //Taking each frame in a loop. Converting the frame to pixel data.
        // console.log(frame);                                                           //BUG FOUND  - WHILE READING FILE NAMES
        let pixelData = await getPixelData(`${pathToFrames}/${frame}`)
        framesObjects.push(pixelData)    
    }
    framesObjects.forEach(element => {      //Add the pixel data of frames to a list from the object data of frames...to make input set 
        framesPixelsArray.push(new Uint8Array(element.data))
    });
    console.log(framesPixelsArray);

    // framesPixelsArray.forEach(obj => {
    //     console.log("OLD PIXELS DATA: \n", new Uint8Array(obj));
    // });

    /*DCP COMPUTE*/ 
    const compute = require('dcp/compute');
    const job = compute.for(framesPixelsArray, workFunction); 

    job.on('accepted', () => {
        console.log(` - Job accepted by scheduler, waiting for results`);
        console.log(` - Job has id ${job.id}`);
        startTime = Date.now();
    });

    job.on('readystatechange', (arg) => {
        console.log(`new ready state: ${arg}`);
    });

    job.on('result', (ev) => {
        console.log(
            ` - Received result for slice ${ev.sliceNumber} at ${Math.round((Date.now() - startTime) / 100) / 10
            }s`,
        );
    });
  
    job.public.name = 'Arnab\'s intern project, nodejs ';

    let resultSet = await job.localExec(); //for executing the job locally OR
    // let resultSet = await job.exec(0.001); //for executing the job on DCP
    
    // // /* PROCESSING OF RESULTS */ 
    resultSet = Array.from(resultSet);
    console.log(resultSet);
    let counter1 = 0
    resultSet.forEach(function (frame) {
        framesObjects[counter1].data = Array.from(frame)
        counter1++;
    });
    console.log(framesObjects);

    // console.log("New pixels data after the work function:");
    // framesObjects.forEach(element => {
    //     console.log(new Uint8Array(element.data) );
    // });

    /* SOLUTION FOR NON-DCP RESULTS*/
    // for (let frame of framesPixelsArray) {
    //     frame = workFunction(frame);
    // }
    // for (var i = 0; i < framesObjects.length; i++) {    //Copying resulting pixel data of frames back to the list of object data of frames
    //     framesObjects[i].data = framesPixelsArray[i];
    // }

    
    /* SAVING CONVERTED FRAMES' OBJECTS TO FRAMES' IMAGES */
    let counter = 0;    
    for(const frame of framesObjects){      //Loop to save each frame's object data as an image
        counter++;
        console.log(frame);
        let bufferOut = await savePixels(frame, 'jpg'); // ndarray -> Uint8Array
        fs.writeFileSync(`./outputSet/output_${counter}.jpg`, bufferOut._obj);
    }


    /* Stiching resulting frames to a video */
    // createVideo(pathToConvertedFrames);

}

// /* Initialize DCP Client and run main() */
require('dcp-client')
  .init(SCHEDULER_URL)
  .then(main)
  .catch(console.error)
  .finally(process.exit);

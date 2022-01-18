const SCHEDULER_URL = new URL('https://scheduler.distributed.computer');
const fs = require("fs");
const ffmpeg = require('ffmpeg');
const getPixels = require("get-pixels")
var savePixels = require("save-pixels")





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


function createVideo(pathToImages){

}


function workFunction(pixelData){

    // progress();
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
    await createFrames(pathToVideo)//Split the video into frames


    let frames = fs.readdirSync(pathToFrames)    
    for(const frame of frames){             //Taking each frame in a loop. Converting the frame to pixel data.
        console.log(frame);                                                           //BUG FOUND  - WHILE READING FILE NAMES
        let pixelData = await getPixelData(`${pathToFrames}/${frame}`)
        framesObjects.push(pixelData)    
    }

    framesObjects.forEach(element => {      //Add the pixel data of frames to a list from the object data of frames...to make input set 
        framesPixelsArray.push(element.data)
    });

    // console.log("here2");

    /*DCP COMPUTE*/ 
    // const compute = require('dcp/compute');
    // const job = compute.for(videoFramesAsPixels, workFunction); 

    // job.on('accepted', () => {
    //     console.log(` - Job accepted by scheduler, waiting for results`);
    //     console.log(` - Job has id ${job.id}`);
    //     startTime = Date.now();
    // });

    // job.on('readystatechange', (arg) => {
    //     console.log(`new ready state: ${arg}`);
    // });

    // job.on('result', (ev) => {
    //     console.log(
    //         ` - Received result for slice ${ev.sliceNumber} at ${Math.round((Date.now() - startTime) / 100) / 10
    //         }s`,
    //     );
    // });
  
    // job.public.name = 'Arnab\'s intern project, nodejs ';

    // let resultSet = await job.localExec(); //for executing the job locally OR
    // const results = await job.exec(); //for executing the job on DCP

    // resultSet = Array.from(resultSet);
    // console.log(resultSet);


    /*Parsing and using the output set to get final result, i.e the video */
    // console.log(Array.from(results));


    for (let frame of framesPixelsArray) {
        frame = workFunction(frame);
    }



    /* PROCESSING OF RESULTS */ 
    for (var i = 0; i < framesObjects.length; i++) {    //Copying resulting pixel data of frames back to the list of object data of frames
        framesObjects[i].data = framesPixelsArray[i];
    }

    // let counter = 0;    
    // for(const frame of framesObjects){      //Loop to save each frame's object data as an image
    //     counter++;
    //     let bufferOut = await savePixels(frame, 'jpg'); // ndarray -> Uint8Array
    //     fs.writeFileSync(`./outputSet/output_${counter}.jpg`, bufferOut._obj);
    // }


    
    /**
     * Stiching resulting frames to a video
     */
    // createVideo(); using the resulting output set. Might have to use child.process for the ffmpeg command 
    // ffmpeg -i my_frame_854x360_%d.jpg -vcodec mpeg4 test.avi

}

// /* Initialize DCP Client and run main() */
require('dcp-client')
  .init(SCHEDULER_URL)
  .then(main)
  .catch(console.error)
  .finally(process.exit);

const SCHEDULER_URL = new URL('https://scheduler.distributed.computer');
const sharp = require("sharp");

const fs = require("fs");
const ffmpeg = require('ffmpeg');
const getPixels = require("get-pixels")
var image_pixels = require('image-pixels')
var zeros = require("zeros")
var savePixels = require("save-pixels")
const Jimp = require('jimp');



function createFrames(pathToVideo){

    try {
        var process = new ffmpeg(pathToVideo);
        process.then(function (video) {
    
            video.fnExtractFrameToJPG('./frames', {
                every_n_frames : 2,
                file_name : 'my_frame_%s'
            }, function (error, files) {
                if (!error){
                    console.log('Frames saved');
            
                }
                else{
                    console.log('Error! Frames not saved.\n' + error);
                }
            });
        }, function (err) {
            console.log('Error: ' + err);
        });
    } catch (e) {
        console.log(e.code);
        console.log(e.msg);
    }

}



function createVideo(pathToImages){

}



async function cb(myBuffer){
    console.log("here");
    const x = await sharp(myBuffer)
    .toFile("new-path.jpg")
    .then(dataX => {
        console.log(dataX);
    })
    .catch(error => 
        console.log(error));

}


//Possibly work function
async function convertFrame(myBuffer){ 
    
    const x = await sharp(myBuffer)
    .toFile("new-path.jpg")
    .then(dataX => {
        console.log(dataX);
    })
    .catch(error => 
        console.log(error));


}



async function main(){    

    /* INPUT SET */ 
    // createFrames('path_to_video'); //Split the video into frames
    // let videoFrames = [];  //Taking each frame in a loop. Add the frames to a list to make input set
    // fs.readdirSync("./frames").forEach(name => {
        // console.log(name)
        // console.log(fs.readFileSync(`./frames/${name}`));
        // videoFrames.push(fs.readFileSync(`./frames/${name}`))    
    // })  
    // console.log(videoFrames);

     
    let myBuffer = fs.readFileSync("./quality2/frame1.jpg");
    // console.log(myBuffer);
    // const workFn = await sharp(myBuffer).raw().toBuffer().then(data => {
        // console.log('success')
        // console.log(data);  
        // cb(data)
        
    // }).catch(err => console.log(`downsize issue ${err}`))


    // console.log("Pixel Data: " + myBuffer[0], myBuffer[1], myBuffer[2], myBuffer[3]);

    let someConst;
    getPixels(myBuffer, "image/jpeg", function(err, pixels){
        if (err){
            console.log(err);            
            return;
        } else {
            someConst = pixels
            // console.log(someConst);
            // console.log("got pixels", pixels.data[0], pixels.data[1], pixels.data[2], pixels.data[3], )
            // console.log(pixels);
            
        }
    });
    console.log("   Part 1: \n", someConst.data.length);
    
    
    // ... modify ndarray ...

    for(var i = 0; i<someConst.data.length; i=i+4){
        var total = (someConst.data[i] + someConst.data[i+1] + someConst.data[i+2])/3
        someConst.data[i] = total
        someConst.data[i+1] = total
        someConst.data[i+2] = total
        console.log(i);
    }


    const bufferOut = await savePixels(someConst, 'jpg'); // ndarray -> Uint8Array
    // console.log("   Part 2: \n", bufferOut);
    fs.writeFileSync('./output1.jpg', bufferOut._obj);


    
    // for(var i  = 0; i<myBuffer.length; i++){
        
    // }
    // console.log(myBuffer[0]);
    // let x1 = parseInt(myBuffer[0], 16);
    // let x2 = parseInt(myBuffer[1], 16);
    // let x3 = parseInt(myBuffer[2], 16);
    // let x4 = parseInt(myBuffer[3], 16);
    // console.log(x1,x2,x3,x4);


    // console.log(someConst.data);    
    // Save to a file
    // savePixels(someConst, "jpg").pipe(fs.createWriteStream("./test.jpg"))


    // sharp(myBuffer)
    // .toFile('some.jpg')
    // .then(info => { 
    //     console.log(info);
    //  })
    // .catch(err => { 
    //     console.log(err);
    // });


    // var {data, width, height} = await image_pixels(myBuffer)
    // console.log(data);


    // console.log("Width of Image = " + width);
    // console.log("Width of Height = " + height);
    // console.log("Total pixel count: " + width*height);
    // console.log("Data length (4 values for each pixel): " + data.length);

    
    // for(var i = 0; i < data.length; i++){
    //     console.log("Original Val: " + data[i] + ", Hex: " + data[i].toString(16) );
    // }
     
    // console.log("MyBuffer, data, " + typeof(myBuffer), typeof(data));
      
    
    // let something = Jimp.rgbaToInt(171, 181, 194, 255).toString(16);
    // let hexString = (171).toString(16);
    // console.log(something);
    // console.log(hexString);
    // jimg.write("output.png")

    



    //Create an image
    // var x = zeros([32, 32])
    // x.set(16, 16, 255)
    // savePixels(data, "JPG").pipe(fs.createWriteStream("./test.jpg"))     //Save to a file


    // var count = 0;
    // myBuffer.forEach((pixel) => {
        // characters = characters + ASCII_CHARS[Math.floor(pixel * interval)];
    //     console.log(pixel);
    //     count++;
    // });
    // console.log("count: " + count);


    // let imageData = [];      
    // for(var y = 0; y<height; y++){
    //     var x = 0;
    //     let pixels = []
    //     for(var i = width*y; i<(width*y*4)+(width*4); i+4){             
    //         imageData[y][x] = imageData.push(Jimp.rgbaToInt(data[i], data[i+1], data[i+2], data[i+3]))
    //         x = x + 1;
    //     }
    // }

    
    

   


  
    /* WORK FUNCTION */
    // async function workFunction(someBuffer){
        // const sharp = require("sharp")
        // progress();
        // const returnData = sharp(someBuffer)
        // .grayscale() 
        // .toBuffer()
    
        // return "workfunction"
    // }

    /* DCP COMPUTE FOR */
    // const compute = require('dcp/compute');
    // const job = compute.for(videoFrames, workFunction); 
    // job.public.name = 'Arnab example, nodejs';
    // job.requires(["./node_modules/sharp"]);

    // let resultSet = await job.localExec(); //for executing the job locally OR
    // const results = await job.exec(); //for executing the job on DCP

    // resultSet = Array.from(resultSet);
    // console.log(resultSet);
    
    /*Parsing and using the output set to get final result, i.e the video */
    // console.log(Array.from(results));
    //For converting back to image... Base64 => Buffer => Image
    // createVideo(); using the resulting output set. Might have to use child.process for the ffmpeg command 
    // ffmpeg -i my_frame_854x360_%d.jpg -vcodec mpeg4 test.avi

}

// /* Initialize DCP Client and run main() */
require('dcp-client')
  .init(SCHEDULER_URL)
  .then(main)
  .catch(console.error)
  .finally(process.exit);




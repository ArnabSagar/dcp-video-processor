const SCHEDULER_URL = new URL('https://scheduler.distributed.computer');
const sharp = require("sharp");
const readlineSync = require("readline-sync");
const fs = require("fs");

// const mandelbrot = require("./mandelbrot-set.js");
// const create_image = require("./image-animation.js");



const loadFileFromPath = async () => {
  var filePath = readlineSync.question("What's the file path :");
  try {
    const file = await sharp(filePath);
    // console.log(file);
    return file;
  } catch (error) {
    console.error(error);
  }
};


// const convertToGrayscale = async (path) => {
//   const img = await path; 
//   const bw = await img.gamma().greyscale();
//   return bw;
//  };


//  const resizeImg = async (bw, newWidth = 100) => {
//   const blackAndWhite = await bw;
//   const size = await blackAndWhite.metadata();
//   const ratio = size.width / size.height;
//   newHeight = parseInt(newWidth * ratio);
//   const resized = await blackAndWhite.resize(newWidth, newHeight, {
//     fit: "outside",
//   });

//   return resized;
// };


// const pixelToAscii = async (img) => {
//   var newImg = await img;
//   const pixels = await newImg.raw().toBuffer();
//   characters = "";
//   pixels.forEach((pixel) => {
//     characters = characters + ASCII_CHARS[Math.floor(pixel * interval)];
//   });
//   return characters;
// };

// ASCII_CHARS = "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,\"^`'. ".split("");

// charLength = ASCII_CHARS.length;
// interval = charLength / 256;
// var newHeight = null;

// const main = async (newWidth = 100) => {
//   const newImgData = await pixelToAscii(
//     resizeImg(convertToGrayscale(loadFileFromPath()))
//   );
//   const pixels = newImgData.length;
//   let ASCII = "";
//   for (i = 0; i < pixels; i += newWidth) {
//     let line = newImgData.split("").slice(i, i + newWidth);
//     ASCII = ASCII + "\n" + line;
//   }

//   setTimeout(() => {
//     fs.writeFile("output.txt", ASCII, () => {
//       console.log("done");
//     });
//   }, 5000);
// };



const ffmpeg = require('ffmpeg');
// const Image = require('ascii-art-image');
// function preview (){
    // var image = new Image({
    //     filepath: `./frames/my_frame_1920x810_317.jpg`,
    //     alphabet:'variant1'
    // });

    // image.write(function(err, rendered){
    //     console.log(rendered);

    // })
// }


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

//Possibly work function
function convertFrame(image){ 
    



}

function createVideo(pathToImages){

    // const { Converter } = require("ffmpeg-stream")
    // const { createReadStream, createWriteStream } = require("fs")

    // async function convert() {
    //     const converter = new Converter()

    //     // get a writable input stream and pipe an image file to it
    //     const converterInput = converter.createInputStream({
    //         f: "image2pipe",
    //         vcodec: "mjpeg",
    //     })
    //     createReadStream(`${__dirname}/cat.jpg`).pipe(converterInput)

    //     // create an output stream, crop/scale image, save to file via node stream

    //     const converterOutput = converter.createOutputStream({
    //         f: "image2",
    //         vcodec: "mjpeg",
    //         vf: "crop=300:300,scale=100:100",
    //     })
    //     converterOutput.pipe(createWriteStream(`${__dirname}/cat_thumb.jpg`))

    //     // same, but save tconvert base64 image to pixel art
    //     // start processing

    //     await converter.run()
    // }
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

async function main(){    

    let videoFrames = [];
    // fs.readdirSync("./frames").forEach(name => {
        // console.log(name)
        // console.log(fs.readFileSync(`./frames/${name}`));
        // videoFrames.push(fs.readFileSync(`./frames/${name}`))    
    // })  
    // console.log(videoFrames);

      

    // let myBuffer;

    // const result = await sharp(buffer).resize(52, 52).toBuffer().then(data => {
    //     console.log('success')
    //     console.log(data);
        //<Buffer ff d8 ff db 00 43 00 06 04 05 06 05 04 06 06 05 06 07 07 06 08 0a 10 0a 0a 09 09 0a 14 0e 0f 0c 10 17 14 18 18 17 14 16 16 1a 1d 25 1f 1a 1b 23 1c 16 ... 1162 more bytes>
            
        //cb(data)
        
    // }).catch(err => console.log(`downsize issue ${err}`))

    // fs.writeFileSync("new-path.jpg", myBuffer);


    /* Setting up the Input Set */ 
    // createFrames('path_to_video'); //to Split the video into frames
    // convertFrame(); //Taking each frame in a loop. Add the frames to a list to make input set



    // console.log(contents.toString());

    // Data and work function
    // const data = [1, 53, 2, 12];


    // function workFunction(datum) {
      // Return the square of the number passed in
      // progress();
      // return datum * datum;
    // }
    

    /*DCP COMPUTE FOR */
    // const compute = require('dcp/compute');
    // const job = compute.for(inputSet, workFn); 
    // job.public.name = 'Arnab example, nodejs';
    // const results = await job.localExec(); //for executing the job locally OR
    // const results = await job.exec(); //for executing the job on DCP
    
    
    /*Parsing and using the output set to get final result, i.e the video */
    // console.log(Array.from(results));
    //For converting back to image... Base64 => Buffer => Image
    // createVideo(); using the resulting output set. Might have to use child.process for the ffmpeg command 
    // ffmpeg -i my_frame_854x360_%d.jpg -vcodec mpeg4 test.avi


}




/* Initialize DCP Client and run main() */
require('dcp-client')
  .init(SCHEDULER_URL)
  .then(main)
  .catch(console.error)
  .finally(process.exit);

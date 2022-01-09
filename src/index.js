// const SCHEDULER_URL = new URL('https://scheduler.distributed.computer');


// async function main() {

    // await init('https://scheduler.distributed.computer');

    // const compute = require('dcp/compute');
  
    // Data and work function
    // const data = [1, 53, 2, 12];
    // function workFunction(datum) {
      // Return the square of the number passed in
      // progress();
      // return datum * datum;
    // }require('dcp-client')
    //   .init(SCHEDULER_URL)
    //   .then(main)
    //   .catch(console.error)
    //   .finally(process.exit);
    
    // job.public.name = 'Arnab example, nodejs';
    // const results = await job.localExec();
    //const results = await job.exec(compute.marketValue);
    // const results = await job.exec(0.0001);
    
    // console.log(Array.from(results));

  // }

/* Initialize DCP Client and run main() */
// require('dcp-client')
//   .init(SCHEDULER_URL)
//   .then(main)
//   .catch(console.error)
//   .finally(process.exit);




// const sharp = require("sharp");
// const readlineSync = require("readline-sync");
// const fs = require("fs");


// const loadFileFromPath = async () => {
//   var filePath = readlineSync.question("What's the file path :");
//   try {
//     const file = await sharp(filePath);
//     return file;
//   } catch (error) {
//     console.error(error);
//   }
// };


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

    // for(var i = 1; i<1000; i++){

    //     var image = new Image({
    //         filepath: `./frames/my_frame_1920x810_${i}.jpg`,
    //         alphabet:'variant1'
    //     });
    
    //     image.write(function(err, rendered){
    //         console.log(rendered);
    
    //     })
    

    // }
        

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
    
    // var image = new Image({
    //     filepath: `./frames/my_frame_1920x810_317.jpg`,
    //     alphabet:'variant1'
    // });

    // image.write(function(err, rendered){
    //     console.log(rendered);

    // })

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


async function workFunc(image) {

    let DEFAULT_OPT = {
        blurMode: {
            name: "bilateral",
            radius: 5
        },
        edgeWeakening: 50,
        resize: false
    }
    
    let Cartoonlization = require("photo2cartoon");
    
    let c = new Cartoonlization(DEFAULT_OPT);

    c.init(`frame.jpg`).then((cs)=>{
        let c = cs[0];
        c.make();
        c.toFile(`./result/test500.jpg`);
    });

}

const main = () => {    
 
    // createFrames('testvid1.mp4');
    // createVideo();

    // ffmpeg -i my_frame_854x360_%d.jpg -vcodec mpeg4 test.avi


}

main();
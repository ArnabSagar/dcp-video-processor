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




const sharp = require("sharp");
const readlineSync = require("readline-sync");
const fs = require("fs");



const loadFileFromPath = async () => {
  var filePath = readlineSync.question("What's the file path :");
  try {
    const file = await sharp(filePath);
    return file;
  } catch (error) {
    console.error(error);
  }
};


const convertToGrayscale = async (path) => {
  const img = await path; 
  const bw = await img.gamma().greyscale();
  return bw;
 };


 const resizeImg = async (bw, newWidth = 100) => {
  const blackAndWhite = await bw;
  const size = await blackAndWhite.metadata();
  const ratio = size.width / size.height;
  newHeight = parseInt(newWidth * ratio);
  const resized = await blackAndWhite.resize(newWidth, newHeight, {
    fit: "outside",
  });

  return resized;
};


const pixelToAscii = async (img) => {
  var newImg = await img;
  const pixels = await newImg.raw().toBuffer();
  characters = "";
  pixels.forEach((pixel) => {
    characters = characters + ASCII_CHARS[Math.floor(pixel * interval)];
  });
  return characters;
};

ASCII_CHARS = "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,\"^`'. ".split("");

charLength = ASCII_CHARS.length;
interval = charLength / 256;
var newHeight = null;

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


const main = () => {    

    try {
        var process = new ffmpeg('testvid.mp4');
        process.then(function (video) {
            // Callback mode
            video.fnExtractFrameToJPG('./frames', {
                every_n_frames : 2,
                file_name : 'my_frame_%t_%s'
            }, function (error, files) {
                if (!error){
                    console.log('Frames: ' + files);
                }
                else{
                    console.log(error);
                }
            });
        }, function (err) {
            console.log('Error: ' + err);
        });
    } catch (e) {
        console.log(e.code);
        console.log(e.msg);
    }




    //Per FRAME ASCII ::  

  const Image = require('ascii-art-image');


    for(var i = 0; i<1000; i++){
        
    }

  var image = new Image({
      filepath: './frames/my_frame_1641511707878_1920x810_317.jpg',
      alphabet:'variant4'
  });

  image.write(function(err, rendered){
      console.log(rendered);

  })


}


main();
var img2ascii = require("image-to-ascii");
var base64Img = require('base64-img');
// const fs = require("fs");

// let base64;

// Convert an octocat into ascii :)
img2ascii("x.jpeg", function (err, result) {
    console.log(result);
    // base64 = Buffer.from(result).toString('base64')
    // fs.writeFile("./result.txt", result, function(err){
        // if(err){
    //         console.log(err);
    //     }
    // });

})




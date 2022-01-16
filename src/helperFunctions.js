const ffmpeg = require('ffmpeg');

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

module.exports = { createFrames }
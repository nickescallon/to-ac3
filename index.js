var ffmpeg = require('fluent-ffmpeg');
var glob = require('glob');

var sources = {
  baraka: '/Volumes/My_Passport/HD Films/Baraka.mkv',
  batman: '/Volumes/My_Passport/HD Films/Batman Begins/Batman Begins.mp4',
  movies: '/Volumes/My_Passport/HD Films/**/*.+(mkv|mp4)'
};

var moviePaths = glob.sync(sources.movies);

var testDest = '/Volumes/My_Passport/HD Films/Batman Begins/Batman Begins audio.mp4';

var CODEC_MAP = {
  aac: 'aac',
  dts: 'dca', 
};

var NAME_REGEX = new RegExp('[a-zA-Z0-9_ ]*.\\w+$');



var count = 0;
// log data
moviePaths.forEach(function(movie) {
  ffmpeg(movie)
    .on('end', function() {
      console.log('done?');
    })
    .ffprobe(function(err, metaData) {
      // handle err
      if (err) {
        console.log('ERROR: ' + err);
      }

      // iterate through streams
      metaData.streams.forEach(function(stream) {
        var name;
        if (stream.codec_type === 'audio' && stream.codec_name !== 'ac3') {
          name = movie.match(NAME_REGEX)[0];
          count++;
          console.log(name + ': ' +  stream.codec_name);
          console.log(count);
        }
      });
    });
  });

// iterate through all files and store non ac3 one in memory

// 



// ffmpeg.ffprobe(sources.batman, function(err, metaData) {
//   if (err) {
//     console.log('ERROR: ' + err);
//   }
//   console.log(metaData);
// });

// ffmpeg.getAvailableCodecs(function(err, codecs) {
//   console.log('Available codecs:');
//   console.dir(codecs);
// });


// this works, need to generalize it.
// ffmpeg(sources.batman)
//   .audioCodec('ac3')
//   .save(testDest)
//   .on('progress', function(progress) {
//     console.log('Processing: ' + progress.percent + '% done');
//   });
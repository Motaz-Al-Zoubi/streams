//-
// <h4>Downloading a File</h4>
//
// The example below demonstrates how we can reference a remote file, then
// pipe its contents to a local file. This is effectively creating a local
// backup of your remote data.
//-
const {Storage} = require('@google-cloud/storage');
const storage = new Storage({keyFilename: "./Harmonica-Dev-4e5c9baf8730-circleci.json"});
const bucket = storage.bucket('motaz-harmonica-public-bucket');

const fs = require('fs');
const remoteFile = bucket.file('PlacesBase.java');
const localFilename = './PlacesBase.java';

remoteFile.createReadStream()
  .on('error', function(err) {
    console.log('err', JSON.stringify(err, null, 4));
  })
  .on('response', function(response) {
    // Server connected and responded with the specified status and headers.
    console.log('response', JSON.stringify(response, null, 4));
   })
  .on('end', function(end) {
    // The file is fully downloaded.
    console.log('end', JSON.stringify(end, null, 4));
  })
  .pipe(fs.createWriteStream(localFilename));

// //-
// // To limit the downloaded data to only a byte range, pass an options
// // object.
// //-
// const logFile = myBucket.file('access_log');
// logFile.createReadStream({
//     start: 10000,
//     end: 20000
//   })
//   .on('error', function(err) {})
//   .pipe(fs.createWriteStream('/Users/stephen/logfile.txt'));

// //-
// // To read a tail byte range, specify only `options.end` as a negative
// // number.
// //-
// const logFile = myBucket.file('access_log');
// logFile.createReadStream({
//     end: -100
//   })
//   .on('error', function(err) {})
//   .pipe(fs.createWriteStream('/Users/stephen/logfile.txt'));
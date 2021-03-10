var fs = require('fs');
var dir = require('node-dir');
var result = {};
var filesCount = 0;
var currentFileCount = 0;
var _ = require('lodash');
var args = process.argv.slice(2);
var folderName = "/home/motaz/Desktop/data";

var filename = '0.sql';

dir.files(folderName, function(err, files) {
  if (err) throw err;
  filesCount = files.length;
  //we have an array of files now, so now we'll iterate that array
  files.forEach(function(filePath) {
    linesCount = 0;
    console.log('filePath :>> ', filePath);
    actionOnFile(filePath);
  });
});

var actionOnFile = function(filePath) {
    var stream = fs.createReadStream(filePath, {flags: 'r', encoding: 'utf-8'});
    var buf = '';
    
    stream.on('data', function(d) {
        buf += d.toString(); // when data is read, stash it in a string buffer
        pump(); // then process the buffer
    })
    .on('end', function() {
        currentFileCount += 1;
        if(filesCount === currentFileCount) {
            console.log('filesCount :>> ', filesCount);
        }
    });
    
    function pump() {
        var pos;
    
        while ((pos = buf.indexOf('\n')) >= 0) { // keep going while there's a newline somewhere in the buffer
            if (pos == 0) { // if there's more than one newline in a row, the buffer will now start with a newline
                buf = buf.slice(1); // discard it
                continue; // so that the next iteration will start with data
            }
            processLogEntry(buf.slice(0,pos)); // hand off the line
            buf = buf.slice(pos+1); // and slice the processed data off the buffer
        }
    }
    
    function processLogEntry(line) { // here's where we do something with a line
        if (line[line.length-1] == '\r') line=line.substr(0,line.length-1); // discard CR (0x0D)
    
        if (line.length > 0) { // ignore empty lines
            linesCount++;
            if (linesCount % 2000 === 0) {
                filename = linesCount + '.sql';
            } 

            fs.appendFile(filename, line + '\n', function (err) {
              if (err) throw err;
              console.log(filename + " Saved!");
            });
        }
    }
};

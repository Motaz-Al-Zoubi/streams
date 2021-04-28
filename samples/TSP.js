var fs = require("fs");
var dir = require("node-dir");
var result = {};
var filesCount = 0;
var currentFileCount = 0;
var _ = require("lodash");
var args = process.argv.slice(2);
// var folderName = "2020/12/16"; //args[0];
userIds = [];
deviceIds = [];

var total = 0;
var yesRate = 0;
var doesntHaveAdjustItem = 0;
dir.files("./Data", function (err, files) {
    if (err) throw err;
    filesCount = files.length;
    //we have an array of files now, so now we'll iterate that array
    files.forEach(function (filePath) {
      console.log('filePath :>> ', filePath);
      if(_.last(filePath.split(".")) === 'json') {
        actionOnFile(filePath);
      } 
    });

    console.log('total :>> ', total);
    console.log('yesRate :>> ', yesRate);
    console.log('doesntHaveAdjustItem :>> ', doesntHaveAdjustItem);
    console.log('have adjust consents + doesntHaveAdjustItem :>> ', total + doesntHaveAdjustItem);
    console.log("filesCount :>> ", filesCount);
    console.log('yes Rate = ', yesRate/total * 100);
    console.log('userIds :>> ', userIds.length);
    console.log('unique userIds :>> ', _.uniq(userIds).length);
    console.log('deviceIds :>> ', deviceIds.length);
    console.log('unique deviceIds :>> ', _.uniq(deviceIds).length);
  }
);

var actionOnFile = function (filePath) {
  var rawUser = fs.readFileSync(filePath);
  var user = JSON.parse(rawUser);
  userIds.push(user.userIdentifier);
  deviceIds.push(user.deviceId);
  var consents = user.consents.filter(consent => consent.code === 'RN_adjust');
  if(consents.length > 0) {
    total++;
    if (consents[0].enabled === true) {
      yesRate++;
    } else {
      console.log('user.userIdentifier :>> ', user.userIdentifier);
    }
  } else {
    doesntHaveAdjustItem++;
  }
};
//data folder
// total :>>  461245
// yesRate :>>  406830
// doesntHaveAdjustItem :>>  29715
// have adjust consents + doesntHaveAdjustItem :>>  490960
// filesCount :>>  490960 + 4 meta files
// yes Rate =  88.20258214181183
// userIds :>>  490960
// unique userIds :>>  433416
// deviceIds :>>  490960
// unique deviceIds :>>  414276
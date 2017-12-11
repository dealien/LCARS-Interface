const dataFolder = './data/';
const fs = require('fs');

function walk(currentDirPath, callback) {
  var fs = require('fs'),
    path = require('path');
  fs.readdir(currentDirPath, function(err, files) {
    if (err) {
      throw new Error(err);
    }
    files.forEach(function(name) {
      var filePath = path.join(currentDirPath, name);
      var stat = fs.statSync(filePath);
      if (stat.isFile()) {
        callback(filePath, stat);
      } else if (stat.isDirectory()) {
        walk(filePath, callback);
      }
    });
  });
}

function loadDatabase() {
  walk(dataFolder, function(filePath, stat) {
    console.log(filePath);
  });
}

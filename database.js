const fs = require('fs');

module.exports = {
  generateFileList: function() {
    var fs = require('fs'),
      path = require('path');
    fs.readdir('./data/', function(err, files) {
      if (err) {
        throw new Error(err);
      }
      files.forEach(function(name) {
        var filePath = path.join('./data/', name);
        var stat = fs.statSync(filePath);
        if (stat.isFile()) {
          callback(filePath, stat);
        } else if (stat.isDirectory()) {
          walk(filePath, callback);
        }
      });
    });
  },
  scan: function() {
    var files = [];
    walk('./data/', function(filePath, stat) {
      files.push(filePath.toString());
    });
  }
  // },
  // load: function() {

  // }
}

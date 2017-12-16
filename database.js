module.exports = {
  getFilesInFolder: function(currentDirPath, callback) {
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
          this.getFilesInFolder(filePath, callback);
        }
      });
    });
  },
  list: function(dataPath) {
    var files = [];
    this.getFilesInFolder(dataPath, function(filePath, stat) {
      files.push(filePath.toString());
    });
  }
  // },
  // load: function() {

  // }
};

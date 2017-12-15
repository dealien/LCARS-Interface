/*jshint esversion: 6 */

var express = require("express");
var exphbs = require("express-handlebars");
var app = express();
var fs = require("fs");
var path = require("path");
var port = 8080;

var datafolder = "files/data/";
var datafiles = [];

// var database = require("./database");

app.use(express.static("files"));

app.listen(port, function(err) {
    if (err) {
        return console.log("Something bad happened", err);
    }
    console.log('Server is listening on ' + port + '\nhttp://localhost:' + port + '/');
});

// Data to render
app.get("/", function(request, response) {
    // loadDatabase(datafolder); // Generate file list and send it to the client via "res.json()"
    response.render("home", {
        file_name: "The name of the loaded file",
        file_data: "The contents of the currently loaded data file are displayed here."
    });
    // response.json({ "files": l });

    // async.series([
    //     function(callback) {
    //         var folders = ["Ships"];
    //         var d = [];
    //         console.log("About to make request");
    //         // make an async call here
    //         // require('../utils/http-wrapper/http').post(req.body, httpConfig,
    //         //     function(err, data) {
    //         //         console.log("still have res: " + res);
    //         //         console.log("Got response: " + data);
    //         //         // data.isAuthorized is set by the service being invoked
    //         //         callback(false, data);
    //         //     });

    //         for (var i = 0; i < folders.length; i++) {
    //             var currentFolder = datafolder + "/" + folders[i];
    //             fs.readdir(currentFolder, function(err, files) {
    //                 var l = "";
    //                 for (var i = 0; i < files.length; i++) {
    //                     console.log(files[i]);
    //                     l += files[i] + "\n";
    //                 }
    //                 if (err) {
    //                     console.log(err);
    //                     callback(err);
    //                 } else {
    //                     console.log("success");
    //                     callback(null, l);
    //                 }
    //             });
    //         }
    //     },
    //     function(err, results) {
    //         logger.info("Inside collate method");
    //         // correctly gets invoked after async call completes
    //         // but res.json isn't sending anything to the client
    //         response.json({
    //             files: results
    //         });
    //     }
    // ]);
});

app.engine(
    ".hbs",
    exphbs({
        defaultLayout: "main",
        extname: ".hbs",
        layoutsDir: path.join(__dirname, "views/layouts")
    })
);
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "views"));

// ########## DATABASE FUNCTIONS ##########

function loadDatabase(path) {
    var d = [];
    fs.readdir(path, function(err, folders) {
        // console.log(folders);
        for (var i = 0; i < folders.length; i++) {
            // console.log(folders[i]);
            var subPath = path + '/' + folders[i];
            fs.readdir(subPath, function(err, files) {
                var l = '';
                for (var i = 0; i < files.length; i++) {
                    console.log(files[i]);
                    l += files[i] + '\n'; // Send this raw to be loaded by the client via AJAX
                }
                if (err) {
                    console.log(err);
                    callback(err);
                } else {
                    console.log('success');
                    callback(null, l);
                }
            });
        }
    });
}

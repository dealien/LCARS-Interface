const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const path = require('path')
const port = 8080

const dataFolder = './data/';
const fs = require('fs');
const database = require('./database')

app.use(express.static('files'))

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err)
    }
    console.log(`Server is listening on ${port}\nhttp://localhost:${port}/`)
})

// Data to render
app.get('/', (request, response) => {
    response.render('home', {
        file_name: 'The name of the loaded file',
        file_data: 'The contents of the currently loaded data file are displayed here.'
    })
})

app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'views/layouts')
}))
app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'views'))

// ########## DATABASE FUNCTIONS ##########

function listFiles() {
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
}

function scan() {
    var files = [];
    walk('./data/', function(filePath, stat) {
        files.push(filePath.toString());
    });
}
// },
// load: function() {

// }
}

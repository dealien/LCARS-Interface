const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const path = require('path')
const port = 3000

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }

    console.log(`Server is listening on ${port}\nhttp://localhost:${port}/`)
})

app.get('/', (request, response) => {
    response.render('home', {
        name: 'John'
    })
})

app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'views/layouts')
}))
app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'views'))

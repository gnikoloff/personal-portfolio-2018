const path = require('path')
const express = require('express')
const app = express()
const compression = require('compression')
const device = require('express-device')

const PORT = process.env.PORT || 1102



app.set('view engine', 'pug')
app.use(compression())
app.use(express.static('build'))
app.use(device.capture())
device.enableDeviceHelpers(app)

app.route('/').get((req, res) => {
    res.render('index', {})
})

app.listen(PORT, () => { console.log(`App is listening on port: ${PORT}`) })
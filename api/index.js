const path = require('path')
const express = require('express')
const app = express()
const compression = require('compression')
const device = require('express-device')

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, '../views'))
app.use(compression())
app.use(express.static(path.join(__dirname, '../build')))
app.use(device.capture())
device.enableDeviceHelpers(app)

app.route('/').get((req, res) => {
  res.setHeader('Content-Type', 'text/html')
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate')
  res.render('index', {})
})

module.exports = app;

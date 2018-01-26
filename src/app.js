var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var http = require('http')

var routes = require('./routes')

const app = express()

// Database configuration file. 
var config = require('./_config')

mongoose.connect(config.mongoURI[app.settings.env], function(err, res) {
  if(err) {
    console.log('Error connecting to the database. ' + err)
  } else {
    console.log('Connected to Database: ' + config.mongoURI[app.settings.env])
  }
})

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(expressValidator())

app.use(cors())
app.use('/', routes);

const port = process.env.PORT || 4000

const server = app.listen(port, function() {
  console.log('Listening on port ' + port)
})

module.exports = app 


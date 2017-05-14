var express = require('express')
var app     = express()
var path    = require("path");

app.use(express.static(__dirname + '/public'));

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+'/map.html'));
})

app.get('/vr', function (req, res) {
  res.sendFile(path.join(__dirname+'/index.html'));
})

app.get('/tree', function (req, res) {
  res.sendFile(path.join(__dirname+'/cobatree.html'));
})

app.listen(process.env.PORT || 3000);

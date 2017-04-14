var express = require('express')
var app     = express()
var path    = require("path");

app.use('/static', express.static(__dirname));
// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+'/map.html'));
})

app.get('/vr', function (req, res) {
  res.sendFile(path.join(__dirname+'/index.html'));
})

app.listen(process.env.PORT || 3000);

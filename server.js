var http = require('http');
var express = require('express')
var path = require('path');
var io = require('socket.io')
var app = express()

// var routes_setter = require('./server/config/routes.js');
// routes_setter(app);
app.use(express.static(__dirname));
app.set('viewengine', 'ejs')
app.get('/', function (req, res) {
  res.sendfile(__dirname + 'index.html');
});
var server = app.listen(8000, function(){
  console.log("listening");
})

var io = io.listen(server)

io.sockets.on('connection', function (socket) {
  console.log("connected")
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

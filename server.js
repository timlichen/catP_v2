var http = require('http');
var express = require('express')
var path = require('path');
var io = require('socket.io');
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
  var players = []
  console.log("connected")
  // socket.emit('new_player', { name: 'world });
  socket.on('new_player', function (data) {
    console.log("got new player")
    players.push({name:data.name, id:socket.id})
    console.log(players)
  });
  socket.on('winner', function (data){
    console.log(data, "winner annouce fired")
    socket.broadcast.emit('winnerAnnounce', data)
  })
});

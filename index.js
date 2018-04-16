var express = require('express');
var socket = require('socket.io');
var si = require('systeminformation');
var port = 8080;

var app = express();

// print process.argv
process.argv.forEach(function (val, index, array) {
  if(index == 2) {
    var port = 4000
  }
});

var server = app.listen(8080, function(){
    console.log('listening for requests on port ' + port);
});



// Static files
app.use(express.static('public'));

// Socket setup & pass server
var io = socket(server);
io.on('connection', (socket) => {

    console.log('made socket connection', socket.id);
    io.sockets.emit('connected');

    // Handle chat event
    socket.on('chat', function(data){
        console.log(data);
        //io.sockets.emit('chat', data);
    });

    // Handle typing event
    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });

    // Network Handshake
    socket.on('network-now-request', function(data){
        console.log("Network Handshake Requested");
        io.sockets.emit('network-now-response', "pie");
        // callback style

        console.log("Network Handshake Complete");
    });

    socket.on('about-request', function(data){
        console.log("data");


        data = {
          time: si.time(),
          system: si.system(function(data) {console.log(data);}),
        }
        io.sockets.emit('about-response', si.system(function(data) {console.log(data);}));
    });

});

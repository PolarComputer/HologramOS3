var express = require('express');
var socket = require('socket.io');
var si = require('systeminformation');


// App setup
var app = express();
var server = app.listen(4000, function(){
    console.log('listening for requests on port 4000,');
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

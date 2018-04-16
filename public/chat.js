// Make connection
var socket = io.connect('http://localhost:8080');

// // Query DOM
// var message = document.getElementById('message'),
//       handle = document.getElementById('handle'),
//       btn = document.getElementById('send'),
//       output = document.getElementById('output'),
//       feedback = document.getElementById('feedback');
//
// // Emit events
// btn.addEventListener('click', function(){
//     socket.emit('chat', {
//         message: message.value,
//         handle: handle.value
//     });
//     message.value = "";
// });
//
// message.addEventListener('keypress', function(){
//     socket.emit('typing', handle.value);
// })

$( "#network" ).click(function() {
  socket.emit('network-now-request');
});

$( "#about" ).click(function() {
  socket.emit('about-request');
});


// Listen for events
socket.on('chat', function(data){
    feedback.innerHTML = '';
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});

socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});

// Listen for connection
socket.on('connected', function(data){
  console.log("connected to local holo server");
  $( "active-dot" ).delay(100).css("background", "#2ecc71");
});

// Listen for Network handshake
socket.on('network-now-response', function(data){
  console.log("now network info" + data);
});

// Listen for About System Info
socket.on('about-response', function(data){
  //console.log("System uptime: " + data.time.uptime);
  console.log(data.uuid);
  var data = data;
});

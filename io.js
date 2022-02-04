// const socketIO = require('socket.io');
// const ioServer = socketIO()

// io is our socket.io server!
const io = require('socket.io')();

// Listen for new connections from clients (called sockets)
io.on('connection', function(socket) {
  console.log('Client connected to socket.io');
  // add-circle
  socket.on('add-circle', function(data) {
    io.emit('add-circle', data);
  });
  // clear-page
  socket.on('clear-page', function() {
    io.emit('clear-page');
  });
});

module.exports = io;
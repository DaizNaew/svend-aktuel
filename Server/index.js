var socket = require('socket.io'),
    http = require('http'),
    chalk = require('chalk');

const port = 3001;

var server = http.createServer(function(request, response) {
  // process HTTP request. Since we're writing just WebSockets
  // server we don't have to implement anything.
});
server.listen(port, function(ele) { 
  console.log(chalk.yellow(`Running websocket on port ${port}`))
});

// // create the server
// wsServer = new WebSocketServer({
//   httpServer: server
// });

// // WebSocket server
// wsServer.on('request', function(request) {
//   var connection = request.accept(null, request.origin);

//   // This is the most important callback for us, we'll handle
//   // all messages from users here.
//   connection.on('message', function(message) {
//     if (message.type === 'utf8') {
//       // process WebSocket message
//       console.dir(message);
//     }
//   });

//   connection.on('close', function(connection) {
//     // close user connection
//   });
// });

var io = socket(server);

io.on('connection', (socket) => {
  console.log(chalk.green('Made socket connection'), socket.id);

  socket.on('chat', (data) => {
    io.sockets.emit('chat', data);
  });

  socket.on('typing', (data) => {
    socket.broadcast.emit('typing', data);
  })
})
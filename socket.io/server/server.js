const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
//                                socket.io跨域
const io = new Server(server,  { cors: true });

app.get('/', (req, res) => {
  res.send('hello')
})

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('receive', (data) => {
    // console.log(1,data);
    socket.broadcast.emit('message',data);
  });
});

server.listen(9527, () => {
  console.log('listening on *:9527');
});

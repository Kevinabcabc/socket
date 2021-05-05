const net = require('net');

// const server = net.createServer((socket) => {
//   // socket.end('goodbye\n');
//   socket.write('hello world from server');

//   socket.on('data', (chunk) => {
//     console.log('trunk',chunk.toString());
//   })
// });

// server.on('error', (err) => {
//   throw err;
// })

// server.listen(9527, () => {
//   console.log('server open on', server.address());
// });


const server = new net.createServer();

let clients = {};
let clientName = 0;

server.on('connection', (socket) => {
  socket.name = ++clientName;
  clients[socket.name] = socket;

  socket.on('data', (msg) => {
    broadCast(socket, msg.toString());
  });

  socket.on('error', (e) => {
    console.log('client err', e);
    socket.end();
  });

  socket.on('close', (data) => {
    delete clients[socket.name];
    console.log(socket.name + '已下线');
  });
});


function broadCast(client, msg) {
  for (const key in clients) {
    clients[key].write(client.name + 'say: ' + msg);
  }
}

server.listen(9527, 'localhost');
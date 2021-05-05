const { read } = require('fs');
const net = require('net');

// const client = net.createConnection({port: 9527}, () => {
//   console.log('connect to server!');
//   client.write('hello world from client\r\n');
// });

// client.on('data', (data) => {
//   console.log(data.toString());
//   // client.end();
// });

// client.on('end', () => {
//   console.log('disconnet from server');
// });

const readline = require('readline');

const port = 9527;
const host = '127.0.0.1';

const socket = new net.Socket();
socket.setEncoding('utf-8');

socket.connect(port, host, () => {
  socket.write('hello .');
})

socket.on('data', (msg) => {
  console.log('mm:', msg.toString());
  say();
});

socket.on('error', (e) => {
  console.log('error', e);
});

socket.on('close', (e) => {
  console.log('connection closed');
});

// 标准输入输出
const r1 = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function say() {
  r1.question('请输入：\n', (inputMsg) => {
    if (inputMsg !== 'bye') {
      socket.write(inputMsg + '\n');
    } else {
      socket.destroy();
      r1.close();
    }
  })
}
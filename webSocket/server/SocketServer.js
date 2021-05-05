const WebSocket = require('ws');

const wss = new WebSocket.Server({port: 9527});

wss.on('connection', function connection(ws) {
  ws.on('open', function open() {
    console.log('open');
    ws.send('hello')
  });

  ws.on('message', function incoming(data) {
    console.log(data.toString());
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });

  ws.on('close', () => {
    console.log('disconnected');
  });
});


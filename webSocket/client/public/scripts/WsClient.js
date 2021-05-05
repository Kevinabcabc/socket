const ws = new WebSocket('ws://localhost:9527/');

ws.onopen = () => {
  ws.send('大哥大嫂过年好');
}

ws.onmessage = (msg) => {
  const content = document.getElementById('content');
  content.innerHTML += msg.data + '<br/>';
}

ws.onerror = (e) => {
  console.log('err', e);
}

ws.onclose = () => {
  console.log('closed');
}
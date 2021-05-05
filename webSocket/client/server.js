const http = require('http');
const path = require('path');
const readStaticFile = require('./readStaticFile');


http.createServer(async (req, res) => {
  let urlString = req.url;
  let filePathName = path.join(__dirname, 'public', urlString);
  const { data, type } = await readStaticFile(filePathName);
  res.writeHead(200, {
    'content-type': `${type};charset=utf-8`,
  });
  res.write(data);
  res.end();
}).listen(8080, () => {
  console.log(8080);
});


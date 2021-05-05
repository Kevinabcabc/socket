const path = require('path');
const mime = require('mime');
const fs = require('fs');

const myReadFile = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, content) => {
      if (err) {
        resolve('err file not found 脑片');
      } else {
        resolve(content)
      }
    });
  });
}

const readStaticFile = async (filePathName) => {
  let ext = path.parse(filePathName).ext;
  let type = mime.getType(ext) || 'text/html';
  let data = '';
  // 判断文件是否存在
  if (fs.existsSync(filePathName)) {
    // 判断是否是文件夹
    if (ext) {
      // myReadFile(filePathName)
      data = await myReadFile(filePathName);
      //   .then(res => {
      //     data = res;
      //   })
      //   .catch(err => {
      //     data = err;
      //   });
    } else {
      data = await myReadFile(path.join(filePathName, '/index.html'));
      // myReadFile(path.join(filePathName, '/index.html'))
      //   .then(res => {
      //     data = res;
      //   }).catch(err => {
      //     data = err;
      //   });
    }
  } else {
    data = 'page not found 脑片';
  }
  return {
    type,
    data,
  };
}

module.exports = readStaticFile;
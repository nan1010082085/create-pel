// const path = require('path');
// const fs = require('fs');
// const { green } = require('kolorist');
import path from 'path';
import fs from 'fs';
import { green } from 'kolorist';

export function resolve(str) {
  return path.join(__dirname, '..', str);
}

export function mkdir(path) {
  return fs.mkdirSync(resolve(path));
}

export function createdFileChild(file, root) {
  const chart = fs.readdirSync(file);
  chart.forEach((filename) => {
    let currentPath = `${root}/${filename}`;
    console.log(green(`created file ${currentPath}`));
    if (filename.includes('.')) {
      // 创建文件
      fs.writeFileSync(resolve(currentPath), '');
      let rsPath = `${file}/${filename}`;
      let wsPath = `${currentPath}`;
      const rs = fs.createReadStream(rsPath);
      const ws = fs.createWriteStream(wsPath);
      rs.pipe(ws);
    } else {
      // 创建文件夹
      mkdir(currentPath);
      // 递归创建文件夹下文件
      let childFile = `${file}/${filename}`;
      let childRootPath = `${root}/${filename}`;
      createdFileChild(childFile, childRootPath);
    }
  });
}

// module.exports = {
//   resolve,
//   mkdir,
//   createdFileChild
// };

import path from 'path';
import fs from 'fs';
import { green, cyan } from 'kolorist';
import { fileURLToPath } from 'url';

export function resolve(str) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  return path.join(__dirname, '../..', str);
}

function spliceLast(path) {
  let strArr = path.split('/');
  return strArr[strArr.length - 1];
}

function mkdir(path) {
  console.log(cyan(`created folder ${spliceLast(path)}`));
  return fs.mkdirSync(path);
}

export function createdFileChild(file, root) {
  const chart = fs.readdirSync(file);
  chart.forEach((filename, i) => {
    let currentPath = `${root}/${filename}`;
    if (filename.includes('.')) {
      console.log(cyan(`created file ${spliceLast(currentPath)}`));
      // 创建文件
      fs.writeFileSync(currentPath, '');
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
    // if (i === chart.length - 1) {
    //   console.log(green(`created [ ${spliceLast(root)} ] success`));
    // }
  });
}

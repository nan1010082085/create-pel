import path from 'path';
import fs from 'fs';
import rimraf from 'rimraf';
import { red, cyan, green } from 'kolorist';
import inquire from 'inquirer';
import { resolve, createdFileChild } from './utils/create.js';

let type = '';

let rootPath = 'test';

const prompts = inquire.createPromptModule();

const questions = [
  { type: 'list', name: 'type', choices: ['chart', 'text'], default: 'chart', message: 'What is the widget type ?' },
  { type: 'input', name: 'name', default: '', message: 'What is the widget name ?' }
];

function matchFile(name) {
  let file = resolve(`packages/template-${type}`);
  let isRootFile = fs.readdirSync(process.cwd());
  console.log(isRootFile);
  if ((Array.isArray(isRootFile) && !isRootFile.includes(name)) || !isRootFile) {
    startMkdir(file, name);
  } else {
    prompts([
      { type: 'confirm', name: 'replace', message: `Exists filename [ ${name} ] , Replace ?`, default: 'y' }
    ]).then((answers) => {
      if (answers.replace) {
        console.log(`${process.cwd()}/${name}`);
        rimraf(`${process.cwd()}/${name}`, {}, (err) => {
          if (err) return err;
          console.log(green(`replace folder [ ${name} ] success`));
          startMkdir(file, name);
        });
      }
    });
  }
}

function startMkdir(file, name) {
  const dist = path.join(process.cwd(), name);
  console.log(cyan(`current file path => ${dist}`));
  fs.mkdir(dist, { recursive: true }, (err) => {
    if (err) return err;
    createdFileChild(file, dist);
  });
}

export function run() {
  prompts(questions).then((answers) => {
    rootPath = answers.name;
    type = answers.type;
    if (!answers.name) {
      return console.log(red('please input files name !'));
    }
    matchFile(rootPath);
  });
}

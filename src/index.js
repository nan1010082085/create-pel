// const fs = require('fs');
// const rimraf = require('rimraf');
// const { cyan } = require('kolorist');
// const inquire = require('inquirer');
// const { resolve, mkdir, createdFileChild } = require('./utils/create.js');
import fs from 'fs';
import rimraf from 'rimraf';
import { red, cyan } from 'kolorist';
import inquire from 'inquirer';
import { resolve, createdFileChild } from './utils/create.js'
// const minimist = require('minimist');
// const argv = minimist(process.argv.slice(2));

// 模版类型
let type = '';
// 目标文件夹
let rootPath = 'test';

const prompts = inquire.createPromptModule();
const questions = [
  { type: 'rawlist', name: 'type', choices: ['chart', 'text'], default: 'chart', message: 'What is the widget type ?' },
  { type: 'input', name: 'name', default: '', message: 'What is the widget name ?' }
];
prompts(questions).then((answers) => {
  rootPath = answers.name;
  type = answers.type;
  if (rootPath === '') {
    return console.log(red('please input files name !'));
  }
  matchFile(rootPath);
});

function matchFile(path) {
  let file = resolve(`packages/template-${type}`);
  let isRootFile = fs.readdirSync(resolve('/'));
  if ((Array.isArray(isRootFile) && !isRootFile.includes(path)) || !isRootFile) {
    startMkdir(file, path);
  } else {
    prompts([
      { type: 'confirm', name: 'replace', message: `Exists filename [ ${path} ] , Replace ?`, default: 'y' }
    ]).then((answers) => {
      if (answers.replace) {
        rimraf(resolve(`/${path}`), {}, (err) => {
          if (err) return err;
          console.log(cyan(`replace files [ ${path} ] success`));
          startMkdir(file, path);
        });
      }
    });
  }
}

function startMkdir(file, path) {
  fs.mkdir(resolve(`/${path}`), { recursive: true }, (err) => {
    if (err) return err;
    createdFileChild(file, path);
  });
}

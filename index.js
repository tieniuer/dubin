#!/usr/bin/env node

// const co = require('co');
const program = require('commander');
// const prompt = require('co-prompt')
const PackageSafeWorker = require('./src');


program
  .command('check')
  .description('检测项目依赖包质量')
  .alias('i')
  .action(() => {
    const currentWork = new PackageSafeWorker();
    currentWork.run(true);
  })
program.parse(process.argv)


module.exports = PackageSafeWorker;


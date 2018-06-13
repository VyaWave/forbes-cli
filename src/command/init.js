var program = require('commander')
var inquirer = require('inquirer')
const { OraLoading } = require('../utils/loading')
const { readdir, exists } = require('mz/fs')

program
  .command('init')
  .description('init github project to local')
  .action(function(options) {
    console.log('init command')

    let loader
    loader = OraLoading('check download dir')
    //list命令的实现体
    let choices = ['webpack', 'webpack-react', 'webpack-vue']

    // 类型
    let questions = [
      {
        type: 'list',
        name: 'repo',
        message: 'which repo do you want to install?',
        choices
      }
    ]

    // 调用问题
    inquirer.prompt(questions).then((answers) => {
      console.log(answers) // 输出最终的答案
    })
  })

program.parse(process.argv) //开始解析用户输入的命令

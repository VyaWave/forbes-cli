var program = require( 'commander' );
var inquirer = require( 'inquirer' );
const downloadGitRepo = require('download-git-repo');

import { getRepositoriesFromGithub } from '../service'

const fetchGithubRepoTemplate = (cb) => {
  downloadGitRepo('CavinHuang/node-cli-demo', './test', false, err => {
    console.log(!err ? 'SUCCESS' : "FAIL");
  } )
}

program
  .command( 'install' )
  .description( 'install github project to local' )
  .action( function ( options ) { //list命令的实现体
  // to do
    let choices = [ 'aaa', 'bbb', 'ccc', 'dddd' ];
    let questions = [ {
        type: 'list',
        name: 'repo',
        message: 'which repo do you want to install?',
        choices
    } ];

    console.info(new getRepositoriesFromGithub('222').fetchRepoTagList)

    // 调用问题
    inquirer.prompt( questions )
      .then( answers => {
        console.log( answers ); // 输出最终的答案
        fetchGithubRepoTemplate()
      } )
    } 
);
program.parse( process.argv ); //开始解析用户输入的命令

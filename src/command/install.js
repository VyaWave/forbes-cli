var program = require( 'commander' );
var inquirer = require( 'inquirer' );
const downloadGitRepo = require('download-git-repo');

// import { getRepositoriesFromGithub } from '../service'

const fetchGithubRepoTemplate = (cb) => {
  downloadGitRepo('Template-Store/webpack-demo', process.cwd(), false, res => {
    console.log(res ? 'SUCCESS' : "FAIL");
  } )
}

program
  .command('install')
  .description( 'install github project to local' )
  .action( function ( options ) {
    console.log( 'install command' );
    //list命令的实现体
    let choices = [ 'webpack', 'webpack-react', 'webpack-vue' ];

    // 类型
    let questions = [ {
        type: 'list',
        name: 'repo',
        message: 'which repo do you want to install?',
        choices
    } ];

    // 调用问题
    inquirer.prompt( questions )
      .then( answers => {
        console.log( answers ); // 输出最终的答案
        fetchGithubRepoTemplate()
      } )
    } 
);

program
  .command('s')
  .description( 'install github project to local' )
  .action( function ( options ) {
    console.log( 's command' );
    //list命令的实现体
    let choices = [ 'webpack', 'webpack-react', 'webpack-vue' ];

    // 类型
    let questions = [ {
        type: 'list',
        name: 'repo',
        message: 'which repo do you want to install?',
        choices
    } ];

    // 调用问题
    inquirer.prompt( questions )
      .then( answers => {
        console.log( answers ); // 输出最终的答案
        fetchGithubRepoTemplate()
      } )
    } 
);
program.parse( process.argv ); //开始解析用户输入的命令

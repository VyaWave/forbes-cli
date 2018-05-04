var program = require( 'commander' );
program
  .command( 'list' )
  .description( 'list project for local' )
  .action( function ( options ) { //list命令的实现体
    // to do
    console.log( 'list command' );
    var fs = require( 'fs' );
    //获取当前运行目录下的文件信息
    fs.readdir( process.cwd(), function ( err, files ) {
    console.info(process.argv)
    var list = files;
    if ( !options.all ) { //检查用户是否给了--all或者-a的参数，如果没有，则过滤掉那些以.开头的文件
        list = files.filter( function ( file ) {
        return file.indexOf( '.' ) !== 0;
        } );
    }
    console.log( list.join( '\n\r' ) ); //控制台将所有文件名打印出来
    } );
  } );

program.parse( process.argv ); //开始解析用户输入的命令

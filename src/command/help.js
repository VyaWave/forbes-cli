var program = require( 'commander' );

program
  .help()
  .description( 'help' )
  .action( function ( options ) {
    console.log( 'help command' );
  }
);

program.parse( process.argv ); //开始解析用户输入的命令

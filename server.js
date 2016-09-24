var staticServer = require('static-server');

var server = new  staticServer({

  rootPath: './public/',
  port: 3000


});

server.start(function(){

console.log('server started on port'+server.port);

});

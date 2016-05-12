'use strict'

var restify = require('restify');
var ApiAuth = require('../index.js');



var apiAuth = new ApiAuth( function( id , cb ) {
	if( id === "AKEY" ) {
		cb(  "ASECRET" );
	} else {
		cb( "INVALID KEY"  );
	}
});

function respond(req, res, next) {
	
  apiAuth.check( req , req.body , function( error , is_authenticated , api_auth_id ) {
  	if( error ) {
		res.send("There was an error: "+ error, 500 );
  	} else if( is_authenticated ) {
  		res.send("You are authenticated, your id is: " + api_auth_id , 200 );
  	} else {
  		res.send("You are not authenticated, invalid id: " + api_auth_id , 401 );
  	}
  });
  next();
}

var server = restify.createServer();


server.use(restify.bodyParser({ mapParams: false }))
server.post('/', respond);


server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});
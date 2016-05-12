var api_auth = require('api_auth');
var http = require('http');

var querystring = require('querystring');

var body = "here comes the sun";
 var options = {
    host: 'localhost',
    port: '8080',
    path: '/',
    method: 'POST',
    headers: {
      'Content-Type': 'text',
      'Content-Length': Buffer.byteLength(body)
    }
  }
  
  // Sign options hash using api_auth
  var access_id = 'AKEY';
  var secret = 'ASECRET';
  options = require('api_auth').auth(access_id, secret).sign_options(options, body);
 
  //Make request
  var req = http.request(options, function(response){
      
      var str = "";
      response.on('data', function (chunk) {
   		 str += chunk;
 		 });

	  //the whole response has been recieved, so we just print it out here
	  response.on('end', function () {
	    console.log(str);
	  });
  });
  req.write( body );
  req.end();
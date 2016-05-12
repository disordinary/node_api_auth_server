var crypto = require('crypto');


function Auth ( secretHook ) {
	this.secretHook = secretHook ;
	
	this.check = function( request , body , callback) {
		
		if( typeof this.secretHook != "function"  ) {
			return callback( "secret hook needs to be defined");
		}
		if( request.hasOwnProperty("headers") && request.headers.hasOwnProperty("authorization")) {
		
			//we explicitly ask the client to send the body if they want to check it as parsing the body can interfere with body parsing further down the 


			var headers = request.headers;



			if( headers.authorization.substring( 0 , 7 ) === "APIAuth" ) {

				var authString =[
					  headers["content-type"] || ""
					, headers["content-md5"] || ""
					, request.url
					, headers.date || ""
					].join();
				var id = headers.authorization.substring(8).split(":")[ 0 ];

				//we explicitly ask the client to send the body if they want to check it as parsing the body can interfere with body parsing further down the
					if( typeof body === "string" ) {
						 if( headers["content-md5"] !== crypto.createHash('md5').update(body).digest('base64') ) {
						 	return callback( "body doesn't match" , false , id );
						 }
					}



				this.secretHook( id , function( secret ) {
					var authorisationString = 'APIAuth ' + id + ':' + crypto.createHmac('sha1', secret ).update(authString).digest('base64');
					if ( headers.authorization === authorisationString ) {
						callback( null , true , id   );
					} else {
						//Header Strings don't match
						callback( null , false , id  );
					}
				} );
			} else {
				callback( "authorization token does not conform to APIAuth spec");
			}
		} else {
			callback( "no authorization token in header" );
		}
		
	}

}


function getBody( request , callback ) {
	return callback( null , "" );

	if (request.method !== 'POST' && request.method !== 'PUT') {
		callback( null , "" );
	} else {
        var body = '';
        request.on('data', function (data) {
        	body += data;
        });
        request.on('end', function () {
            return callback( null , body );
        });
    }
}


module.exports = Auth;
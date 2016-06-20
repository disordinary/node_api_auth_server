# node_api_auth_server
An HMAC server compatble with: https://github.com/mgomes/api_auth

A client is available here: https://github.com/jlwebster/node_api_auth_client

To use:

```javascript
var ApiAuth = require('api_auth');
var apiAuth = new ApiAuth( function( id , secret ){
	//this function is called by api_auth and asks for a secret based on the provided id;
	if( id === "ID" ) {
		secret( "SECRET" );
	}
}
});

apiAuth.check( request , body , function( error , is_authenticated , id ) {
	if( is_authenticated) {
		...
	}
}
});

```



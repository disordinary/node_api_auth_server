var assert = require("assert");
var ApiAuth = require("../app.js");
describe( "API Auth test" , ( ) => {
		//build api auth

		

		let fakeRequest = {
			  url : "/test"
			, headers : {
				  'content-type' : 'Application/Json'
				, 'date' : 'Thu, 13 Aug 2015 04:11:44 GMT'
				, 'content-md5' : 'au4qfLylpk6xZ9NxtzksXQ=='
				, 'authorization' : 'APIAuth 671327de-46ae-4280-8e1b-357adc3fae18:XPWJbG5yOYnPiJKAl9th9x0+3No='
			}
		}
		it('should be authorised when authorisation information is correct', ( done ) => {
			let apiAuth = new ApiAuth( ( id , next ) => {
				if( id === "671327de-46ae-4280-8e1b-357adc3fae18" ) {
					next( "DC6tol5KhDOGW6MsLU1h1qlnuMhl1yW3ED8KW52pnMd+CDtwS7DZU0VPzma/fznfmRrigWXWLEYd61VRDWub5g===" );
				}
			});
			apiAuth.check( fakeRequest , ( err , authorised ) => {
				assert.isNull( err );
				assert.ok( authorised );
				done();
			});
		} );

		it('should be authorised when authorisation information is correct', ( done ) => {
			let apiAuth = new ApiAuth( ( id , next ) => {
					next( "FAKE SECRET" );
			});
			apiAuth.check( fakeRequest , ( err , authorised ) => {
				assert.isNull( err );
				assert.notOk( authorised );
				done();
			});
		} );
		it('should fail without a secret', ( done ) => {
			let apiAuth = new ApiAuth( );
			apiAuth.check( fakeRequest , ( err , authorised ) => {
				assert.isNotNull( err );
				console.log( err );
				done();
			});
		} );
		
		it('should fail with out a header', ( done ) => {
			let apiAuth = new ApiAuth( );
			apiAuth.check( { } , ( err , authorised ) => {
				assert.isNotNull( err );
				done();
			});
		} );

});

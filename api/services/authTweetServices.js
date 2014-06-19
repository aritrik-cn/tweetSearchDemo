/**
 * 
 * 
**/

// Load Required Node Modules

var OAuth2 	= require('oauth').OAuth2;
var https  	= require('https');

var twitterConsumerKey = '8qS0KAEMEApPPwMOp3xqw';
var twitterConsumerSecret = 'HoZyZVSDmhjLbl6Ixc4iSBtXTChkyADllbIafDMco';

exports.search = function (searchKeyword, callback) {
	var oauth2 = new OAuth2(twitterConsumerKey,
		twitterConsumerSecret,
		'https://api.twitter.com/',
		null,
		'oauth2/token', 
		null
	);

	oauth2.getOAuthAccessToken(
		'',
		{'grant_type':'client_credentials'},
		function (e, access_token, refresh_token, results) {
			console.log('bearer: ', access_token);
			var options = {
			    hostname: 'api.twitter.com',
			    path: '/1.1/search/tweets.json?q='+ searchKeyword,
			    headers: {
			        Authorization: 'Bearer ' + access_token
			    }
			};
			https.get(options, function(result){
				var buffer = '';
				result.setEncoding('utf8');
				result.on('data', function(data){
					buffer += data;
				});
				result.on('end', function() {
					var returnData = JSON.parse(buffer);
					console.log("tweets" + returnData); // the tweets!
					return callback (returnData);
				});
			});
		}
	);
}
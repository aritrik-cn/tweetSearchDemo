/**
 * 
 * 
**/

// Load Required Node Modules
var OAuth 	= require('oauth').OAuth;
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
};

var userToken = "176182002-RT2tPzPgHti9a3XE5XgAHI2xJI9UvHUBOXZGijnc";
var userSerect = "iY9YcuSXxXRZenRkYRKdaSS1Phxk1ji31ghbMzjQ6y8IK";
exports.postReply = function (postContent, userToken, callback) {
	console.log(userToken);
	oa = new OAuth(
		"https://twitter.com/oauth/request_token"
		, "https://twitter.com/oauth/access_token"
		, twitterConsumerKey
		, twitterConsumerSecret
		, "1.0A"
		, null
		, "HMAC-SHA1"
	);

	oa.post(
		"https://api.twitter.com/1.1/statuses/update.json"
		, userToken
		, userSerect
		// We just have a hard-coded tweet for now
		, postContent
		, function (error, data) {
			return callback (data);
		}	
	);
}
/*exports.postReply = function (postContent, callback) {
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
			    //path: '/1.1/search/tweets.json?q='+ searchKeyword,
			    path: '/1.1/statuses/update.json',
			    headers: {
			        Authorization: 'Bearer ' + access_token
			    }
			};
			var req = https.request(options, function(res) {
				console.log('STATUS: ' + res.statusCode);
				console.log('HEADERS: ' + JSON.stringify(res.headers));
				res.setEncoding('utf8');
				res.on('data', function (chunk) {
					console.log('BODY: ' + chunk);
					//buffer += chunk;
					return callback (chunk);

				});
				/*result.on('end', function() {
					//var returnData = buffer;
					console.log("tweets" + buffer); // the tweets!
					return callback (buffer);
				});
			});

			req.on('error', function(e) {
				console.log('problem with request: ' + e.message);
			});
			req.write(JSON.stringify(postContent));
			req.end();
			/*https.get(options, function(result){
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
}*/
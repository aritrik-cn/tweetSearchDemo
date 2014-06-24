/**
 * SearchController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */


module.exports = {
    

	searchTweets: function (req, res) {
		var searchKeyword = req.body.searchKey;
		var returnData = {};
		if (req.session.authUser) {
            returnData.loginStat = true;
            returnData.user = req.session.authUser;
        } else {
        	returnData.loginStat = false;
        }
		authTweetServices.search(searchKeyword, function (results) {

			returnData.searchResult = results;
			res.view('home/index', {returnData : returnData});
		});
	},
	replyTweets: function (req, res) {
		console.log("**** Reply Tweets ****");
		console.log(req.body);
		//res.json("success");
		var returnData = {};
		var postContent = req.body;
		var userToken = req.session.authUser.token;
		authTweetServices.postReply(postContent, userToken, function (results) {

			//returnData.searchResult = results;
			res.send(results);
			//res.view('home/index', {returnData : returnData});
		});
	},
	/**
	* Overrides for the settings in `config/controllers.js`
	* (specific to SearchController)
	*/
	_config: {}

  
};

/**
 * HomeController
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
    
  
	loadIndex: function (req, res) {
		var returnData = {};
		if (req.session.authUser) {
            returnData.loginStat = true;
            returnData.user = req.session.authUser;
        } else {
        	returnData.loginStat = false;
        }
		res.view('home/index', {returnData : returnData});
	},

	/**
	* Overrides for the settings in `config/controllers.js`
	* (specific to HomeController)
	*/
	_config: {}

  
};

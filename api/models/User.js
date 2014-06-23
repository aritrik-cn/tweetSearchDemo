/**
 * This is the model class for collection "user".
 * @author Aritrik Das <aritrikdas@gmail.com>
 * @date 18/04/2014
 *
 * @module      :: User Model
 * @description :: This model is to store user details.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {
    
    attributes  : {
        provider: String,
		uid: String,
		username: String,
		displayName: String,
		profilepic: String,
		email: String,		
    }
};

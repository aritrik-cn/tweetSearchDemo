/**
 *
 *
**/
var passport    = require('passport');
var bcrypt      = require('bcrypt');
var crypto      = require('crypto');


exports.authenticate = function (req, res) {
    passport.authenticate(req.params.provider, {failureRedirect: '/login', scope:[setScope(req.params.provider)]}) (req, res);
};

exports.authenticationCallback = function (req, res) {
    var returnData = {};
    passport.authenticate(req.params.provider,
        function (err, user) {
            
            if (user) {
                req.logIn(user, function (err) {
                    if (err) {
                        console.log(" **** err **** " + err);
                        res.view('500');
                        return;
                    }
                    req.session.authUser = req.session.passport.user;
                    //console.log("******* user session Data in passport ****** " + JSON.stringify(req.session.authUser, null, 4));
                    if (req.session.authUser) {
                        returnData.loginStat = true;
                        returnData.user = req.session.authUser;
                    } else {
                        returnData.loginStat = false;
                    }
                    //return res.redirect('/');
                    return res.view('home/index', {returnData : returnData});
                });
            } else {
                return res.redirect('/');
            }
        }
    ) (req, res);
};

// Set Scope
var setScope = function (provider) {
    var scope;
    switch (provider) {
        case 'facebook':
            scope = 'email';
            break;
        case 'google':
            scope = 'https://www.googleapis.com/auth/plus.login',
                    'https://www.googleapis.com/auth/userinfo.profile',
                    'https://www.googleapis.com/auth/userinfo.email';
            break;
        case 'twitter':
            scope = 'email';
            break;
        default :
            scope = null;
    }
    return scope;
}

// Fetch logged in user data and send back

exports.getLoggedinUser = function (req, res) {
    var returnData = {};
    if (req.session.authUser) {
        returnData.success  = true;
        returnData.message  = req.session.authUser;
        res.json(200, returnData);
    } else {
        returnData.success  = false;
        returnData.message  = 'No Valid API Key found to Authenticate User';
        res.json(200, returnData);
    }
}

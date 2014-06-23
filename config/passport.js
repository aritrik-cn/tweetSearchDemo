/**
 *  Author :   Aritrik Das <aritrik.cn@gmail.com>
 *  since Sails version 0.2.0
 *  Data : 23-06-2014
 *  The security layer is required to for User Authentication Using Passport
**/

var passport 			= require('passport'),
    TwitterStrategy     = require('passport-twitter').Strategy;
    //LinkedInStrategy    = require('passport-linkedin').Strategy;

// Verify the user details

passport.serializeUser(function (user, done) {
    //console.log("user :: " + user);
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    User.findOne({uid: user.uid}).done(function (err, user) {
        done(err, user)
    });
});

/** Set App Authentication Varriable with Application Env accordingly, follow the links below to create a native app.
 * Google : https://cloud.google.com/console#/project
 * Facebook : https://developers.facebook.com/apps
 * Github : https://github.com/settings/applications/new
**/
var setMiddleware = {
    "development" : {
        "twitter" : {
            "consumerKey": "8qS0KAEMEApPPwMOp3xqw",
            "consumerSecret": "HoZyZVSDmhjLbl6Ixc4iSBtXTChkyADllbIafDMco",
            "callbackURL": "http://tweetleads.herokuapp.com/auth/twitter/callback"
        }
    }
}

var verifyHandler = function (token, tokenSecret, profile, done) {  

    User.findOne({
            or: [{uid: parseInt(profile.id)},
                {uid: profile.id}
            ]
    }).done(function (err, user) {
        if (user) {
            return done(null, user);
        } else {
            console.log("User token " + token);
            console.log("User tokenSecret " + tokenSecret);
            console.log('**** Profile Data **** ' + JSON.stringify(profile, null, 4));
            var data = {
                provider: profile.provider,
                uid: profile.id,
                username: profile.username,
                displayName : profile.displayName,
                profilepic: profile.photos
            };
            User.create(data).done(function (err, user) {
                console.log("User Create Err :: " + JSON.stringify(err));
                console.log("New User Created  :: " + JSON.stringify(user));
                return done(err, user);
            });
        }
    });
};

// Twitter Authentication
passport.use(new TwitterStrategy(setMiddleware.development.twitter, verifyHandler));

module.exports = {
    // Init custom express middleware
    express: {
        customMiddleware: function (app) {
            app.use(passport.initialize());
            app.use(passport.session());
        }
    }
};

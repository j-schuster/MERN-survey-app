const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('../config/keys');
const mongoose = require('mongoose');

// 'require' user model this way, safer when running tests 
//(will get error when run server change order of require statements)
const User = mongoose.model('users')

// assigns cookie for user
// @params: user is coming promise after ensuring entry to DB 
passport.serializeUser((user, done) => {
// user.id comes from mongo generated id 
	done(null, user.id);
})
// retrieve cookie for user
passport.deserializeUser((id, done) => {
	User.findById(id)
	.then((user) => {
		done(null, user)
	})
})


passport.use(new GoogleStrategy (
	{
		clientID: keys.googleClientID,
		clientSecret: keys.googleClientSecret,
		callbackURL: '/auth/google/callback'
	},
	 (accessToken, refreshToken, profile, done) => {
	 	//check DB for existing user
	 	User.findOne({ googleId: profile.Id })
	 	.then((existingUser) => {
	 		existingUser ? done(null, existingUser) : new User({ googleId: profile.id }).save()
	 		.then(user => done(null, user));
	 	})
	
		}
	)
);
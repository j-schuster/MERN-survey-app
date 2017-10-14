const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport')
const keys = require('./config/keys');
require('./models/user');
require('./services/passport');

const app = express();

//connect to mongoose
mongoose.connect(keys.mongoURI);

// tell passport to use cookies
app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 1000,
		keys: [keys.cookieKey]
	})
);
app.use(passport.initialize());
app.use(passport.session());


require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);


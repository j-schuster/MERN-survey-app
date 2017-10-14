// FOR OUR MONGOOSE MODELS
const mongoose = require('mongoose')
const { Schema } = mongoose;

//create mongoose schema
const userSchema = new Schema ({
	googleId: String
});

//create model class	
//@params: users = name of collection & and existing schema
mongoose.model('users', userSchema)
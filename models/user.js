var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var userSchema = new Schema({
	email:{
		type: String,
		unique: true,
		required: true
	},
	username:{
		type: String,
		unique: true,
		required: true
	},
	hashedPassword: String,
	salt: String,
	firstName: String,
	lastName: String,
	admin: Boolean,
	provider: String
});

module.exports = mongoose.model('User', userSchema);
var mongoose = require('mongoose'),
  	Schema   = mongoose.Schema,
	  crypto   = require('crypto');

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


userSchema
	.virtual('password')
		.set(function(password){
			this._password = password;
		    this.salt = this.makeSalt();
		    this.hashedPassword = this.encryptPassword(password);
		})
		.get(function(){
			return this._password;
		});

userSchema
  .virtual('user_info')
  .get(function(){
    return { 
    	'_id': this._id, 
    	'username': this.username, 
    	'email': crypto.createHash('md5').update(this.email.toLowerCase()).digest('hex'),
    	'firstName': this.firstName
    };
  });


userSchema.methods = {

  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.hashedPassword;
  },

  makeSalt: function() {
    return crypto.randomBytes(16).toString('base64');
  },

  encryptPassword: function(password) {
    if (!password || !this.salt) return '';
    var salt = new Buffer(this.salt, 'base64');
    return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
  }
};

module.exports = mongoose.model('User', userSchema);
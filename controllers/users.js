var User = require("../models/user.js");

exports.all = function(req, res){
	User.find(function(err, users){
		if(err) res.send(err.message);
		res.json(users);
	});
}

exports.create = function(req, res){
	//we need to make sure that we name all the fields in the form according to the mongoose schem.
	//if not - we can create a new user the same way we create a new tool, by creating a new object 
	//and populating the fields.
	var newUser = new User(req.body);
	newUser.provider = 'local';
	newUser.admin = false;

	//return the user
	newUser.save(function(err){
		User.findById(newUser._id, function(err, user){
			if(err) res.send(err.message);
			
			req.logIn(newUser, function(err){
				if(err) return next(err);
				return res.json(newUser.user_info);
			});
		});

	});
	
}

exports.show = function(req,res){
	User.findById(req.params.id, function(err, user){
		if(err) res.send(err.message);
		res.json(user);
	});
}
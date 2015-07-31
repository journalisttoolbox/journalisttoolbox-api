var User     = require("../models/user.js"),
    passport = require('passport');
    jwt      = require('jsonwebtoken');

exports.all = function(req, res){
	User.find(function(err, users){
		if(err) res.send(err.message);
		res.json(users);
	});
};

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
			
      var token = jwt.sign({_id: user._id }, 'journalist toolbox', { expiresInMinutes: 60*5 });
      res.json({ token: token });
		});

	});
	
};

// Method for PUT requests
exports.put = function(req, res) {
  User.findOne({ '_id': req.params.id }, function(err, user) {
    if(!user) {
      // If user is not found
      res.statusCode = 404;
      return res.send({ error: 'Not found' });
    }    
    if(err) {
      res.send(err.message);
    } else {

      // Update all fields
      for(var field in req.body) {
        user[field] = req.body[field];
      }

      user.save(function(err) {
        if(err) {
          res.statusCode = 500;
          res.send({ error: 'Error with put request' });
        } else {
          res.send({ status: 'OK', user: user });
        }
      });
    }
  });
};

// Method for DELETE requests
exports.delete = function(req, res) {
  var query = req.params.id.split(",");
  var error = '';

  User.remove({ '_id': {$in: query }}, function(err, users) {
    if(!users) {
      res.statusCode = 404;
      error = 'Not Found';
      return res.send({ error: 'Not found' });
    }
    if(err) {
      res.statusCode = 500;
      error = err.data;
    } 
    else {
      res.statusCode = 200;
    }
    return res.send({ error: error });
  });
};

exports.show = function(req,res){
	User.findById(req.params.id, function(err, user){
		if(err) res.send(err.message);
		res.json(user);
	});
};
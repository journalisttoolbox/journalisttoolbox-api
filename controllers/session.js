'use strict';

var mongoose = require('mongoose'),
  passport = require('passport');


exports.session = function (req, res) {
  res.json(req.user.user_info);
};

//logout
exports.logout = function (req, res) {
  if(req.user) {
    req.logout();
    res.send(200);
  } else {
    res.send(400, "Not logged in");
  }
};

//login
exports.login = function (req, res, next) {
  console.log("inside login");
  passport.authenticate('local', function(err, user, info) {
    var error = err || info;
    if (error) { return res.json(400, error); }
    req.logIn(user, function(err) {
      if (err) { return res.send(err); }
      res.json(req.user.user_info);
        // res.cookie('user', JSON.stringify(req.user.user_info));
    });
  })(req, res, next);
}
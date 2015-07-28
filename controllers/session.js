'use strict';

var mongoose = require('mongoose'),
  passport = require('passport');


exports.session = function (req, res) {
  res.json(req.user.user_info);
};

//logout
exports.logout = function (req, res) {
  req.logout();
  res.send(200);
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
    });
  })(req, res, next);
}
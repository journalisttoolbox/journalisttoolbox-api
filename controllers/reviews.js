var Review = require("../models/review.js");

// Get all reviews
exports.all = function(req, res) {
  Review.find(function(err, reviews){
    if(err) res.send(err.message);
    res.json(reviews);
  });
};

// Get one review by ID
exports.show = function(req, res) {
  Review.findOne({'_id': req.params.id}, function(err, review) {
    if(!review) {
      // If review is not found
      res.statusCode = 404;
      return res.send({ error: 'Not found' });
    }

    if(err) res.send(err.message);
    res.json(review);
  });
};

// Method for PUT requests
exports.put = function(req, res) {
  Review.findOne({ '_id': req.params.id }, function(err, review) {
    if(!review) {
      // If review is not found
      res.statusCode = 404;
      return res.send({ error: 'Not found' });
    }    
    if(err) {
      res.send(err.message);
    } else {

      // Update all fields
      for(var field in req.body) {
        review[field] = req.body[field];
      }

      review.save(function(err) {
        if(err) {
          res.statusCode = 500;
          res.send({ error: 'Error with put request' });
        } else {
          res.send({ status: 'OK', review: review });
        }
      });
    }
  });
};

// Method for DELETE requests
exports.delete = function(req, res) {
  var query = req.params.id.split(",");
  var error = '';

  Review.remove({ '_id': {$in: query }}, function(err, reviews) {
    if(!reviews) {
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

// creating a new review
exports.create = function(req, res) {

  var newReview = new Review({
    toolID:   req.body.toolID,
    toolName: req.body.toolName,
    rating:   req.body.rating
  });

  newReview.save();

  // Return all results including the new one.
  Review.find(function(err, reviews){
    if(err) res.send(err.message);
    res.json(reviews);
  });
};

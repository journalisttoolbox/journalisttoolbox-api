var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var reviewSchema = new Schema({
  toolID:   String,
  toolName: String,
  rating:   Number
});

module.exports = mongoose.model('Review', reviewSchema);
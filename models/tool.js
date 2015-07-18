var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var toolSchema = new Schema({
	name: String,
	description: String
});

module.exports = mongoose.model('Tool', toolSchema);
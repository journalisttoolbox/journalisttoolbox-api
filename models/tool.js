var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var toolSchema = new Schema({
	name: String,
	developer: String,	
	description: String,
	free: String,
	price: String,
	version: String,
	organization: Array,
	category: Array,
	home_url: String,
	github_url: String,
	download_url: String,
	platforms: Array,
	upvotes: Number,
	downvotes: Number,
	owner: String,
	uploaded_date: Date
});

module.exports = mongoose.model('Tool', toolSchema);
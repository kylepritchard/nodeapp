// Load Mongoose dependency
var mongoose = require('mongoose');

// Define post schema
var PostSchema = new mongoose.Schema({
	title: String,
	content: String,
	userId: String,
	simpleTitle: String
});

// Export the mongoose model
module.exports = mongoose.model('Post', PostSchema);
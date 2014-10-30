// Load Mongoose dependency
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostCommentSchema = new Schema({
    content: String,
    userId: String,
    commentDate: String,
    author: String
});

// Define post schema
var PostSchema = new Schema({
    title: String,
    content: String,
    userId: String,
    simpleTitle: String,
    postDate: String,
    postUrl: String,
    author: String,
    comments: [PostCommentSchema]
});

// Export the mongoose models
module.exports.Post = mongoose.model('Post', PostSchema);
module.exports.Comment = mongoose.model('Comment', PostCommentSchema);
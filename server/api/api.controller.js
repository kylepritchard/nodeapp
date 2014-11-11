'use strict';

var postmodels = require('../posts/post.model');
var usermodels = require('../users/user.model');
var moment = require('moment');
var when = require('when');

/*
    Save a new post to DB
*/
exports.postPosts = function(req, res) {
    var post = new postmodels.Post();

    // Set properties for POST data
    post.title = req.body.title;
    post.content = req.body.content;
    post.userId = req.user._id;
    var simpleTitle = req.body.title;
    post.simpleTitle = post.title.replace(/\s+/g, '_').toLowerCase();
    post.postDate = moment();
    post.postUrl = "/posts/" + post.simpleTitle;
    post.author = req.user.displayname;

    // Save the post and check for errors
    post.save(function(err) {
        if (err)
            res.send(err);

        postmodels.Post.find(function(err, posts) {
            if (err)
                res.send(err);
            res.json(posts);
        });

    });
};

/*
    Get all the posts from DB
*/
exports.getPosts = function(req, res) {
    // Use Post Model to find all posts
    postmodels.Post.find(function(err, posts) {
        if (err)
            res.send(err);
        res.json(posts);
    });
};

/*
    Get specific post from DB
*/
exports.getPost = function(req, res) {
    postmodels.Post.findOne({
        simpleTitle: req.params.post_title
    }, function(err, post) {
        if (err)
            res.send(err);
        res.json(post);
    });
};

/*
    Edit a post in the DB
*/
exports.putPost = function(req, res) {

    postmodels.Post.findOne({
        simpleTitle: req.params.post_title
    }, function(err, post) {
        if (err)
            res.send(err);
        post.title = req.body.title;
        post.content = req.body.content;

        post.save(function(err) {
            if (err)
                res.send(err);

            postmodels.Post.findOne({
                simpleTitle: req.params.post_title
            }, function(err, post) {
                if (err)
                    res.send(err);
                res.json(post);
            });
        });
    });
};

/*
    Post a new comment and attach to the current post in question
*/
exports.postPostComment = function(req, res) {

    postmodels.Post.findOne({
        simpleTitle: req.params.post_title
    }, function(err, post) {
        if (err)
            res.send(err);

        // Form the comment model
        var comment = new postmodels.Comment();
        comment.content = req.body.content;
        comment.commentDate = moment().format('MMM Do YY');
        comment.userId = req.user._id;
        // Add comment model into post
        post.comments.push(comment);

        post.save(function(err) {
            if (err)
                res.send(err);
        });

        res.json(post);
    });
};

/*
    Delete a Post from DB
*/

exports.deletePost = function(req, res) {

    postmodels.Post.findOneAndRemove({
        simpleTitle: req.params.post_title
    }, function(err) {
        if (err)
            res.send(err);

        postmodels.Post.find(function(err, posts) {
            if (err)
                res.send(err);
            res.json(posts);
        });
    });
};

/*
    Delete comment from current post
*/
exports.deletePostComment = function(req, res) {

    postmodels.Post.findOne({
        simpleTitle: req.params.post_title
    }, function(err, post) {
        if (err)
            res.send(err);

        post.comments.id(req.params.comment_id).remove();

        post.save(function(err) {
            if (err)
                res.send(err);
        });

        res.send('deleted');
    });
};


// Create endpoint /api/users for POST
exports.newUser = function(req, res) {
    var user = new usermodels.User({
        username: req.body.username,
        password: req.body.password,
        displayname: req.body.displayname
    });

    user.save(function(err) {
        if (err)
            res.send(err);

        res.json({
            message: 'New user added'
        });
    });
};

// Create endpoint /api/users for GET
exports.getUsers = function(req, res) {
    usermodels.User.find(function(err, users) {
        if (err)
            res.send(err)

        res.json(users);
    });
};

exports.dashCount = function(req, res) {

    usermodels.User.count(function(err, count) {
        var usercount = count;

        postmodels.Post.count(function(err, count) {
            var postcount = count;

            var counter = {
                'usercount': usercount,
                'postcount': postcount
            };

            res.json(counter);
        });
    });

};
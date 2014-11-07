'use strict';

// Date processing
var moment = require('moment');

exports.getDashboard = function(req, res) {
    res.render('admin/dashboard', {
        layout: 'admin'
    });
};

var postmodels = require('../posts/post.model');

// Create endpoint /api/users for POST
exports.getPosts = function(req, res) {
    //Use Post Model to find all posts
    postmodels.Post.find(function(err, posts) {
        if (err)
            res.send(err);

        res.render('admin/posts/posts', {
            posts: posts,
            layout: 'admin'
        });
    });
};

exports.addPost = function(req, res) {
    //Use Post Model to find all post
    res.render('admin/posts/addpost', {
        layout: 'admin'
    });
};

exports.postPost = function(req, res) {
    var post = new postmodels.Post();

    // Set properties for POST data
    post.title = req.body.title;
    post.content = req.body.content;
    post.userId = req.user._id;
    var simpleTitle = req.body.title;
    post.simpleTitle = post.title.replace(/\s+/g, '_').toLowerCase();
    post.postDate = moment().format('MMM Do YY');
    post.postUrl = "/posts/" + post.simpleTitle;
    post.author = req.user.displayname;

    // Save the post and check for errors
    post.save(function(err) {
        if (err)
            res.send(err);
        res.redirect('/admin/posts');
    });
};

exports.getPost = function(req, res) {

    postmodels.Post.findOne({
        simpleTitle: req.params.post_title
    }, function(err, post) {
        if (err)
            res.send(err)
            //Use Post Model to find all post
        res.render('admin/posts/editpost', {
            layout: 'admin',
            post: post
        });
    });
};

exports.editPost = function(req, res) {

    postmodels.Post.findOne({
        simpleTitle: req.params.post_title
    }, function(err, post) {
        if (err)
            res.send(err);

        post.title = req.body.title;
        post.content = req.body.content;
        post.simpleTitle = post.title.replace(/\s+/g, '_').toLowerCase();

        post.save(function(err) {
            if (err)
                res.send(err);
            res.redirect('/admin/posts');
        });
    });
};
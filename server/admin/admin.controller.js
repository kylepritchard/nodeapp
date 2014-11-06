'use strict';

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
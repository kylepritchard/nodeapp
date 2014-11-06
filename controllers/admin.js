// Load model
var postmodels = require('../models/post');


module.exports.getDashboard = function(req, res) {
    res.render('admin/dashboard', {
        layout: 'admin'
    });
};

// Create endpoint /api/users for POST
module.exports.getPosts = function(req, res) {
    //Use Post Model to find all posts
    postmodels.Post.find(function(err, posts) {
        if (err)
            res.send(err);
        // res.render('admin/posts/posts', {
        //     posts: posts,
        //     layout: 'admin'
        // });

        res.render('admin/posts/posts', {
            posts: posts,
            layout: 'admin'
        });
    });
};

// Create endpoint /api/users for GET
exports.getUsers = function(req, res) {
    User.find(function(err, users) {
        if (err)
            res.send(err)

        res.json(users);
    });
};
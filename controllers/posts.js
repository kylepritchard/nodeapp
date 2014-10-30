var postmodels = require('../models/post');
var moment = require('moment');

/*
    Save a new post to DB
*/
module.exports.postPosts = function(req, res) {
    var post = new postmodels.Post();

    // Set properties for POST data
    post.title = req.body.title;
    post.content = req.body.content;
    post.userId = req.user._id;
    simpleTitle = req.body.title;
    post.simpleTitle = post.title.replace(/\s+/g, '_').toLowerCase();
    post.postDate = moment().format('MMM Do YY');
    post.postUrl = "/posts/" + post.simpleTitle;
    post.author = req.user.displayname;

    // Save the post and check for errors
    post.save(function(err) {
        if (err)
            res.send(err);
        res.redirect('/posts');
    });
};

/*
    Get all the posts from DB
*/
module.exports.getPosts = function(req, res) {
    //Use Post Model to find all posts
    postmodels.Post.find(function(err, posts) {
        if (err)
            res.send(err);
        res.render('posts', {
            posts: posts
        });
    });
};

/*
    Get specific post from DB
*/
module.exports.getPost = function(req, res) {
    postmodels.Post.findOne({
        simpleTitle: req.params.post_title
    }, function(err, post) {
        if (err)
            res.send(err);
        res.render('post', {
            post: post
        });
    });
};

/*
    Edit a post in the DB
*/
module.exports.putPost = function(req, res) {

    postmodels.Post.findOne({
        simpleTitle: req.params.post_title
    }, function(err, post) {
        if (err)
            res.send(err);

        post.content = req.body.content;

        post.save(function(err) {
            if (err)
                res.send(err);
            res.json(post);
        });
    });
};

/*
    Post a new comment and attach to the current post in question
*/
module.exports.putPostComment = function(req, res) {

    postmodels.Post.findOne({
        simpleTitle: req.params.post_title
    }, function(err, post) {
        if (err)
            res.send(err);

        console.log(post);
        // // Form the comment model
        var comment = new postmodels.Comment();
        comment.content = req.body.content;
        comment.commentDate = moment().format('MMM Do YY');
        comment.userId = req.user._id;
        console.log('here');
        console.log(post);
        // Add comment model into post
        post.comments.push(comment);

        post.save(function(err) {
            if (err)
                res.send(err);
        });

        res.redirect('/posts/' + req.params.post_title);
    });
};

/*
    Delete a Post from DB
*/
module.exports.deletePost = function(req, res) {

    postmodels.Post.findOneAndRemove({
        simpleTitle: req.params.post_title
    }, function(err) {
        if (err)
            res.send(err);

        res.end();
    });
};

/*
    Delete comment from current post
*/
module.exports.deletePostComment = function(req, res) {

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

        res.end();
    });
};
var Post = require('../models/post');

// Create endpoint /api/posts for POSTS
exports.postPosts = function(req, res){
	var post = new Post();

	// Set prperties for POST data
	post.title = req.body.title;
	post.content = req.body.content;
	post.userId = req.user._id
	simpleTitle = req.body.title;
	post.simpleTitle = post.title.replace(/\s+/g, '_').toLowerCase();

	// Save the post and check for errors
	post.save(function(err){
		if (err)
			res.send(err);
		res.json({ message: 'Post added', data: post });
	});
};

// Create endpoint /api/posts for GET
exports.getPosts = function(req, res){
	//Use Post Model to find all posts
	Post.find(function(err, posts){
		if (err)
			res.send(err);

			res.render('index', {posts: posts});
	});
};

exports.getPost = function(req, res){
	Post.findOne({simpleTitle: req.params.post_title}, function(err, post){
		if (err)
			res.send(err);

		res.render('index', {posts: post});
	});
};

exports.putPost = function(req, res) {
	// Use the Beer model to find a specific beer
	Post.findOne({simpleTitle: req.params.post_title}, function(err, post){
		if (err)
			res.send(err);

		// Update the existing beer quantity
		post.content = req.body.content;

		// Save the beer and check for errors
		post.save(function(err) {
			if (err)
				res.send(err);

			res.json(post);
		});
	});
};

exports.deletePost = function(req, res) {
	
	// Use the Beer model to find a specific beer and remove it
	Post.findOneAndRemove({simpleTitle: req.params.post_title}, function(err) {
		if (err)
			res.send(err);

		res.json({ message: 'Post removed' });
	});
};
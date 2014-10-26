var express = require('express');
var router = express.Router();

// Load Controllers
var postController = require('../controllers/posts');
var authController = require('../controllers/auth');

// Create routing for /posts
router.route('/posts')
  .get(postController.getPosts);

// Create routing for /posts/post_title
router.route('/posts/:post_title')
  .get(postController.getPost);

// Create routing for /posts
router.route('/api/posts')
  .post(authController.isAuthenticated, postController.postPosts);

// Create routing for /posts/post_title
router.route('/api/posts/:post_title')
  .put(authController.isAuthenticated, postController.putPost)
  .delete(authController.isAuthenticated, postController.deletePost);

module.exports = router;
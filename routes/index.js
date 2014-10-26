var express = require('express');
var router = express.Router();

// Load Controllers
var postController = require('../controllers/posts');
var userController = require('../controllers/users');
var authController = require('../controllers/auth');

// ****************************************
// Homepage
// ****************************************

router.get('/', function(req, res) {
  res.render('index');
});

// ****************************************
// Users
// ****************************************

// Display posts /posts & /posts/simpleTitle
router.route('/posts')
  .get(postController.getPosts);

router.route('/posts/:post_title')
  .get(postController.getPost);

// Edit and add posts with API /api/posts & /api/posts/simpleTitle
router.route('/api/posts')
  .post(authController.isAuthenticated, postController.postPosts);

// Create routing for /posts/post_title
router.route('/api/posts/:post_title')
  .put(authController.isAuthenticated, postController.putPost)
  .delete(authController.isAuthenticated, postController.deletePost);


// ****************************************
// Users
// ****************************************

router.route('/users')
  .get(authController.isAuthenticated, userController.getUsers);

router.route('/api/users/')
  .post(userController.postUsers);


router.post('/upload', function(req, res, next) {

  res.send(req.body.name);
});

// Export the routes
module.exports = router;
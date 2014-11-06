'use strict';

// Essentials
var express = require('express');
var router = express.Router();

// Authentication controller if authentication required
var authController = require('../auth/auth.controller');

// Use function below for authenticating
// -->authController.isAuthenticated<--

// Controller for this module
var controller = require('./post.controller');

// GET requests
router.get('/', controller.getPosts);
router.get('/:post_title', controller.getPost);

// POST requests
router.post('/', authController.isAuthenticated, controller.postPosts);
router.post('/:post_title/comment', authController.isAuthenticated, controller.postPostComment);

// UPDATE requests
router.put('/:post_title', authController.isAuthenticated, controller.putPost);

// DELETE requests
router.delete('/:post_title', authController.isAuthenticated, controller.deletePost);
router.delete('/:post_title/comment/:comment_id', authController.isAuthenticated, controller.deletePostComment);

module.exports = router;
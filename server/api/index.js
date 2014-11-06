'use strict';

// Essentials
var express = require('express');
var router = express.Router();

// Authentication controller if authentication required
var authController = require('../auth/auth.controller');

// Use function below for authenticating
// -->authController.isAuthenticated<--

// Controller for this module
var controller = require('./api.controller');

// GET requests
// **********************

// Posts
router.get('/posts', controller.getPosts);
router.get('/posts/:post_title', controller.getPost);

// Users
router.get('/users', authController.isAuthenticated, controller.getUsers);


// POST requests
// **********************

// Posts
router.post('/posts', authController.isAuthenticated, controller.postPosts);
router.post('/posts/:post_title/comment', authController.isAuthenticated, controller.postPostComment);

// Users
router.post('/users', controller.newUser);

// UPDATE requests
// **********************

// Posts
router.put('/posts/:post_title', authController.isAuthenticated, controller.putPost);

// DELETE requests
// **********************

// Posts
router.delete('/posts/:post_title', authController.isAuthenticated, controller.deletePost);
router.delete('/posts/:post_title/comment/:comment_id', authController.isAuthenticated, controller.deletePostComment);

module.exports = router;
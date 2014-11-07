'use strict';

// Essentials
var express = require('express');
var router = express.Router();

// Authentication controller if authentication required
var authController = require('../auth/auth.controller');

// Use function below for authenticating
// -->authController.isAuthenticated<--

// Controller for this module
var controller = require('./admin.controller');


// GET requests
router.get('/', authController.isAuthenticated, controller.getDashboard);
router.get('/posts', authController.isAuthenticated, controller.getPosts);
router.get('/posts/newpost', authController.isAuthenticated, controller.addPost);
router.get('/posts/:post_title', authController.isAuthenticated, controller.getPost);

// POST requests
router.post('/posts/newpost', authController.isAuthenticated, controller.postPost);

// UPDATE requests
router.post('/posts/:post_title', controller.editPost); //post command as it is from form

// DELETE requests
// router.delete('/:username', controller.deleteUser);

module.exports = router;
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

// POST requests
// router.get('/posts', controller.getPosts);

// UPDATE requests
// router.put('/:username', controller.putUser);

// DELETE requests
// router.delete('/:username', controller.deleteUser);

module.exports = router;
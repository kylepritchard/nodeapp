'use strict';

// Essentials
var express = require('express');
var router = express.Router();

// Authentication controller if authentication required
var authController = require('../auth/auth.controller');

// Use function below for authenticating
// -->authController.isAuthenticated<--

// Controller for this module
var controller = require('./upload.controller');

// GET requests

// POST requests
router.post('/', authController.isAuthenticated, controller.postUpload);

// UPDATE requests

// DELETE requests

module.exports = router;
'use strict';

// Essentials
var express = require('express');
var router = express.Router();

// Authentication controller if authentication required
var authController = require('../auth/auth.controller');

// Use function below for authenticating
// -->authController.isAuthenticated<--

// Controller for this module
var controller = require('./user.controller');

// GET requests
router.get('/', authController.isAuthenticated, controller.getUsers);

// POST requests
router.post('/', controller.newUser);

// UPDATE requests
// router.put('/:username', controller.putUser);

// DELETE requests
// router.delete('/:username', controller.deleteUser);

module.exports = router;
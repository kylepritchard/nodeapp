var express = require('express');
var fs = require('fs');
var router = express.Router();
var rd = require('recurring-date');
var us = require('underscore');
var moment = require('moment');

// Load Controllers
var postController = require('../controllers/posts');
var userController = require('../controllers/users');
var authController = require('../controllers/auth');
var uploadController = require('../controllers/upload');
var adminController = require('../controllers/admin');

/*
    Homepage
*/


router.get('/', function(req, res) {
    res.render('index');

    // Date parsing
    // var date = moment().format('MM/DD/YYYY');;
    // var pattern = {
    //     "date": date,
    //     "every": "2",
    //     "unit": "d",
    //     "end_condition": "for",
    //     "until": "12/1/2014",
    //     "rfor": "10",
    //     "nth": "1",
    //     "occurence_of": "0",
    //     "days": null
    // };
    // var r = new rd(pattern);
    // var dates = r.generate();
    // var userDates = [];
    // dates.forEach(function(date) {
    //     var gooddate = moment(date._d).format('DD/MM/YY');
    //     // console.log(gooddate);
    //     userDates.push(gooddate);
    // });
    //
    // res.json(userDates);
});

/*
    Posts
*/

// Display posts /posts & /posts/simpleTitle
// router.route('/posts')
//     .get(postController.getPosts);
//
// router.route('/posts/:post_title')
//     .get(postController.getPost);
//
// // Edit and add posts with API /api/posts & /api/posts/simpleTitle
// router.route('/api/posts')
//     .post(authController.isAuthenticated, postController.postPosts);
//
// // Create routing for /posts/post_title
// router.route('/api/posts/:post_title')
//     .put(authController.isAuthenticated, postController.putPost)
//     .delete(authController.isAuthenticated, postController.deletePost);
//
// // Create routing for /posts/post_title
// router.route('/api/posts/:post_title/comment')
//     .post(authController.isAuthenticated, postController.putPostComment);
//
// // Create routing for /posts/post_title
// router.route('/api/posts/:post_title/comment/:comment_id')
//     .delete(authController.isAuthenticated, postController.deletePostComment);

/*
    Users
*/

router.route('/users')
    .get(authController.isAuthenticated, userController.getUsers);

router.route('/api/users')
    .post(userController.postUsers);

/*
    Uploads routing
*/

router.route('/upload')
    .post(uploadController.postUpload);

/*
    Admin
*/

router.route('/admin')
    .get(authController.isAuthenticated, adminController.getDashboard);

router.route('/admin/posts')
    .get(adminController.getPosts);

// Export the routes
module.exports = router;
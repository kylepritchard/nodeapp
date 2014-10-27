var express = require('express');
var fs = require('fs');
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

    // Set file location for retrieving images
    var filelocation = "http://localhost:3000/uploads/";

    // Get the file information from upload
    var imageupload = req.files;

    // Create the string for saving the image info to imagelist.json
    var imagejson =
        ",{\"title\":\"" + imageupload.file.name +
        "\",\"image\":\"" + filelocation + imageupload.file.name +
        "\",\"thumb\":\"" + filelocation + imageupload.file.name +
        "\"}]";

    // Set the location of the image list
    var outputFilename = 'public/uploads/imagelist.json';

    // Open the imagelist.json file
    fs.readFile(outputFilename, 'utf8', function(err, data) {
        if (err)
            console.log(err);
        // Parse the imagelist file and stringify for editing
        data = JSON.parse(data);
        var str = JSON.stringify(data);

        // Add new image information to parsed string
        var newstring = str.replace("]", imagejson);

        // Write the new information to the imagelist.json file
        fs.writeFile(outputFilename, newstring, function(err) {
            if (err)
                console.log(err);
            console.log("JSON saved to " + outputFilename);
        });
    });
});
// Export the routes
module.exports = router;
/*
This function will use multer to upload multipart forms
Imagemagick will resize any images automatically to form a thumbnail
*/

var multer = require('multer'),
    im = require('imagemagick'),
    fs = require('fs');

/*
    Deal with multipart form uploads
*/

module.exports = multer({
    dest: './public/uploads/',
    rename: function(fieldname, filename) {
        return filename.replace(/\W+/g, '-').toLowerCase();
    },
    onFileUploadComplete: function(file) {

        /*
        When file is complete begin to resize and save images
        */
        if (file.mimetype.indexOf('image/') >= 0) {

            // Resize image to thumbnail (256px wide)
            im.resize({
                srcPath: './' + file.path,
                dstPath: './public/uploads/thumbs/' + file.name,
                width: 100
            }, function(err, stdout, stderr) {
                if (err)
                    console.log('fuck, something went wrong');
            });

            // Resize image to large (1280px wide)
            im.resize({
                srcPath: './' + file.path,
                dstPath: './' + file.path,
                width: 1280
            }, function(err, stdout, stderr) {
                if (err)
                    console.log('fuck, something went wrong');
            });
        }
    }
});

/*
    When a file is uploaded then we want to take its information
    and save the basic data into a json file so that Redactor can
    read the info and make the images/files available
*/

module.exports.postUpload = function(req, res, next) {

    // Set file location for retrieving images
    var filelocation = "http://localhost:3000/uploads/";

    // Get the file information from upload
    var upload = req.files;

    // Set the location of the image list
    var imagelistJSON = 'public/uploads/imagelist.json';

    // Set the location of the file list
    var filelistJSON = 'public/uploads/filelist.json';

    if (upload.file.mimetype.indexOf('image/') >= 0) {

        // Create the string for saving the image info to imagelist.json

        var imagejson = {
            "title": upload.file.name,
            "image": filelocation + upload.file.name,
            "thumb": filelocation + 'thumbs/' + upload.file.name
        };

        // Open the imagelist.json file
        fs.readFile(imagelistJSON, 'utf8', function(err, data) {
            if (err)
                console.log(err);

            // Parse the imagelist file and stringify for editing
            data = JSON.parse(data);

            // Add the new imagejson object to array
            data.push(imagejson);

            // Write the new information to the imagelist.json file (stringified first :))
            fs.writeFile(imagelistJSON, JSON.stringify(data, null, 4), function(err) {
                if (err)
                    console.log(err);
            });
        });

    } else {

        // Create the string for saving the image info to imagelist.json
        var filejson = {
            "title": upload.file.name,
            "name": upload.file.name,
            "link": filelocation + upload.file.name,
            "size": upload.file.size,
            "type": upload.file.extension
        }

        // Open the imagelist.json file
        fs.readFile(filelistJSON, 'utf8', function(err, data) {
            if (err)
                console.log(err);

            // Parse the imagelist file and stringify for editing
            data = JSON.parse(data);

            // Add the new imagejson object to array
            data.push(filejson);

            // Write the new information to the imagelist.json file
            fs.writeFile(filelistJSON, JSON.stringify(data, null, 4), function(err) {
                if (err)
                    console.log(err);
            });
        });

        console.log('not an image uploaded');

    };

    res.end();

};
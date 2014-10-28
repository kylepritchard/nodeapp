/*
This function will use multer to upload multipart forms
Imagemagick will resize any images automatically to form a thumbnail
*/

var multer = require('multer'),
    im = require('imagemagick');

module.exports = multer({
    dest: './public/uploads/',
    rename: function(fieldname, filename) {
        return filename.replace(/\W+/g, '-').toLowerCase();
    },
    onFileUploadComplete: function(file) {

        /*
        When file is complete begin to resize and save images
        */

        // Resize image to thumbnail (256px wide)
        im.resize({
            srcPath: './' + file.path,
            dstPath: './public/uploads/thumbs/' + file.name,
            width: 256
        }, function(err, stdout, stderr) {
            if (err)
                console.log('fuck');
        });

        // Resize image to large (1280px wide)
        im.resize({
            srcPath: './' + file.path,
            dstPath: './' + file.path,
            width: 1280
        }, function(err, stdout, stderr) {
            if (err)
                console.log('fuck');
        });

    }
});
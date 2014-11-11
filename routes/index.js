'use strict';

module.exports = function(app) {

    // Routes to modules
    app.use('/upload', require('../server/uploads'));
    // app.use('/admin', require('../server/admin'));
    // app.use('/users', require('../server/users'));
    // app.use('/posts', require('../server/posts'));
    app.use('/api', require('../server/api'));

    // Site Homepage
    // app.get('/', function(req, res) {
    //     res.render('index');
    // });

    // catch requests for admin section
    app.get('/admin*', function(req, res) {
        res.sendfile('./public/views/admin.html');
    });

    // app.get('/admin/posts', function(req, res) {
    //     res.sendfile('./public/views/admin.html');
    // });

    // Catch All
    app.get('*', function(req, res) {
        res.sendfile('./public/views/index.html');
    });



};
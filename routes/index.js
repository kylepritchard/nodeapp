'use strict';

module.exports = function(app) {

    // Routes to modules
    app.use('/upload', require('../server/uploads'));
    app.use('/admin', require('../server/admin'));
    app.use('/users', require('../server/users'));
    app.use('/posts', require('../server/posts'));

    // Site Homepage
    app.get('/', function(req, res) {
        res.render('index');
    });

};
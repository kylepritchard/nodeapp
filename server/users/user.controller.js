'use strict';

var usermodels = require('./user.model');

// Create endpoint /api/users for POST
exports.newUser = function(req, res) {
    var user = new usermodels.User({
        username: req.body.username,
        password: req.body.password,
        displayname: req.body.displayname
    });

    user.save(function(err) {
        if (err)
            res.send(err);

        res.json({
            message: 'New user added'
        });
    });
};

// Create endpoint /api/users for GET
exports.getUsers = function(req, res) {
    usermodels.User.find(function(err, users) {
        if (err)
            res.send(err)

        res.json(users);
    });
};
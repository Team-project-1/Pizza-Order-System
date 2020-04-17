const express = require('express');
const router = express.Router();
const Users = require('../../model/user');

// LIST OF ALL USERS
router.get('/users', function(req, res) {
    console.log('get request for all users');
    Users.find({})
    .exec(function(err, users) {
        if(err) {
            console.log("Error retrieving users");
        } else {
            res.json(users)
        }
    })
});
// ----------------------------------------------------------

// API FOR FETCHING A PARTICULAR USER
router.get('/users/:id', function(req, res) {
    console.log('get request for a single user');
    Users.findById(req.params.id)
    .exec(function(err, user) {
        if(err) {
            console.log("Error retrieving user");
        } else {
            res.json(user)
        }
    })
});
// -------------------------------------------------------------------

module.exports = router;
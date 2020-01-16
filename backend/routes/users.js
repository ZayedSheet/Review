/**
 * Endpoints for working with users
 * @type {Router}
 */

const router = require('express').Router();
let User = require('../models/users.model');
// const UserSession = require('../models/userSession.model');

//Email Verification
var clientId = '177121524554-9s9c1aqsa8oah279sj2aftg113016ceh.apps.googleusercontent.com';
var apiKey = 'AIzaSyCw1ioW71q3_Zff5NEV4bQwujkqX3Q81_E';

/**
 * Retrieves all users
 */
router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

/**
 * Gets a user based on user id
 */
router.route('/:id').get((req, res) => {
    User.findById(req.params.id, {password: 0})
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
});

/**
 * Adds a user to users collection based on request body
 */
router.route('/add').post((req, res) => {
    //Retrieves required fields from request body
    const username = req.body.username;
    const password = req.body.password;
    const name = req.body.name;
    let email = req.body.email;

    //formats email address
    email = email.toLowerCase();
    email = email.trim();

    // ******** Backend Validation for adding a user ********

    //email cannot be empty
    if (!email) {
        return res.send({
            success: false,
            message: 'Error: Email cannot be blank.'
        });
    }
    //password cannot be empty
    if (!password) {
        return res.send({
            success: false,
            message: 'Error: Password cannot be blank.'
        });
    }
    //name must be between 2 and 20 characters, names cannot begin or end with whitespace.
    // Only one whitespace is allowed between strings
    if (!(name.length > 2 && name.length < 20) || !name.match(/^([a-zA-Z]+\s)*[a-zA-Z]+$/)){
        return res.send({
            success: false,
            message: 'invalid name format or length'
        });
    }
    //email allows special characters and ensures an @ is followed by a string which is followed by
    if (!email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
        return res.send({
            success: false,
            message: 'invalid email format'
        });
    }
    //username must be between 4 and 20 characters, username can only contain numbers, letters and no spaces
    // Only one whitespace is allowed between strings
    if (!(username.length > 4 && username.length < 20) || !name.match(/^[a-zA-Z0-9]+$/)){
        return res.send({
            success: false,
            message: 'invalid username format or length'
        });
    }

    // ******** Saving document (if validates) to db ********

    //Creates a new user document based on Review Schema
    const newUser = new User({username, name, email});
    //Uses bcrypt to encrypt the password
    newUser.password = newUser.generateHash(password);

    //Saves the user to users collection
    newUser.save()
        .then(() => res.json("User Added!"))//just returns the string user added
        .catch(err => res.status(400).json('Error: ' + err));

});



module.exports = router;

//TODO test form validation
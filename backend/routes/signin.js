/**
 * Endpoints for signing in
 * @type {Router}
 */

const router = require('express').Router();
let User = require('../models/users.model');
const UserSession = require('../models/userSession.model');

/**
 * Sigin user based on request body
 */
router.route('/signin').post((req,res) => {
    // Username and password from request
    const password = req.body.password;
    let username = req.body.username; //Not const because will be encrypted


    // ******** Backend Validation for signing in ********

    //Username can't be empty
    if (!username) {
        return res.send({
            success: false,
            message: 'Error: username cannot be blank.'
        });
    }

    //Password can't be empty
    if (!password) {
        return res.send({
            success: false,
            message: 'Error: Password cannot be blank.'
        });
    }


    // ******** User Sign in ********

    User.find({ //find field username from username field in user collection
        username: username
    }, (err, users) => {
        if (err) {
            console.log('err 2:', err);
            return res.send({
                success: false,
                message: 'Error: Server Error, User May Not Exist'
            });
        }
        //if there is more than one person with that username
        if (users.length !== 1) {
            return res.send({
                success: false,
                message: 'Error: Server Error'
            });
        }

        const user = users[0]; //User.find returns array, user will be the first element in array

        //Checks if entered password matches via bcrypt
        if (!user.validPassword(password)) {
            return res.send({
                success: false,
                message: 'Error: Invalid Password'
            });
        }


        // ******** Creates a session for the user (if validates) ********

        const userSession = new UserSession();
        userSession.userid = user._id;
        userSession.save((err, doc) => {
            if (err) {
                console.log(err);
                return res.send({
                    success: false,
                    message: 'Error: server error'
                });
            }
            // Server response contain user session token (id of userSession)
            return res.send({
                success: true,
                message: 'Valid sign in',
                token: doc._id
            });
        });
    });
});

/**
 * Gets a users id based on session id
 */
router.route('/getuserid/:id').get((req, res) => {
    UserSession.findById(req.params.id)
        .then(usersession => res.json(usersession.userid))
        .catch(err => res.status(400).json('Error: ' + err));
});

/**
 * logs user out by setting session to deleted
 */
router.route('/logout').post((req,res) => {
    // Get the token

    // Verify the token is unique and it's not deleted.
    UserSession.findOneAndUpdate({
        _id: req.token,
        isDeleted: false
    }, {
        $set: {
            isDeleted:true
        }
    }, null, (err, sessions) => {
        if (err) {
            console.log(err);
            return res.send({
                success: false,
                message: 'Error: Server error'
            });
        }
        return res.send({
            success: true,
            message: 'Good'
        });
    });
});

/**
 * Verify that the token is active
 */
router.route('/verify').get((req,res) => {
    // Get the token
    const { query } = req;
    const { token } = query;
    console.log(token);
    // ?token=test
    // Verify the token is one of a kind and it's not deleted.
    UserSession.find({
        _id: token,
        isDeleted: false
    }, (err, sessions) => {
        if (err) { //the token either doesn't exist or has been deleted
            console.log(err);
            return res.send({//returns this object as a result
                success: false,
                message: 'Error: Invalid Token'
            });
        }
        if (sessions.length !== 1) { //if the session is not unique
            return res.send({
                success: false,
                message: 'Error: Session not Unique'
            });
        } else { //the session exists, is unique and has not been deleted
            return res.send({
                success: true,
                message: 'Success: Token Found'
            });
        }
    });
});

module.exports = router;
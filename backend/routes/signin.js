const router = require('express').Router();
let User = require('../models/users.model');
const UserSession = require('../models/userSession.model');

router.route('/signin').post((req,res) => {
    const password = req.body.password;
    let username = req.body.username;

    if (!username) {
        return res.send({
            success: false,
            message: 'Error: username cannot be blank.'
        });
    }

    if (!password) {
        return res.send({
            success: false,
            message: 'Error: Password cannot be blank.'
        });
    }

    username = username.trim();

    User.find({ //find field username from username field in user collection
        username: username
    }, (err, users) => {
        if (err) {
            console.log('err 2:', err);
            return res.send({
                success: false,
                message: 'Error: server error'
            });
        }
        if (users.length !== 1) {//if there is more than one person with that username
            return res.send({
                success: false,
                message: 'Error: Invalid'
            });
        }

        const user = users[0];
        if (!user.validPassword(password)) {
            return res.send({
                success: false,
                message: 'Error: Invalid'
            });
        }
        // Otherwise correct user
        const userSession = new UserSession();
        userSession.username = user.username;
        userSession.save((err, doc) => {
            if (err) {
                console.log(err);
                return res.send({
                    success: false,
                    message: 'Error: server error'
                });
            }
            return res.send({
                success: true,
                message: 'Valid sign in',
                token: doc._id
            });
        });
    });
});

router.route('/getusername/:id').get((req, res) => {
    UserSession.findById(req.params.id)
        .then(usersession => res.json(usersession.username))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/logout').get((req,res) => {
    // Get the token
    const { query } = req;
    const { token } = query;
    // ?token=test
    // Verify the token is one of a kind and it's not deleted.
    UserSession.findOneAndUpdate({
        _id: token,
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
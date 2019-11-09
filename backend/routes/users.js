const router = require('express').Router();
let User = require('../models/users.model');

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const userPassword = req.body.userPassword;
    const displayName = req.body.displayName;
    const userEmail = req.body.userEmail;

    if (!userEmail) {
        return res.send({
            success: false,
            message: 'Error: Email cannot be blank.'
        });
    }
    if (!userPassword) {
        return res.send({
            success: false,
            message: 'Error: Password cannot be blank.'
        });
    }

    const newUser = new User({username, userPassword, displayName, userEmail});

    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;

//TODO add full form validation
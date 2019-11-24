const router = require('express').Router();
let User = require('../models/users.model');
// const UserSession = require('../models/userSession.model');

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const name = req.body.name;
    let email = req.body.email;

    email = email.toLowerCase();
    email = email.trim();

    if (!email) {
        return res.send({
            success: false,
            message: 'Error: Email cannot be blank.'
        });
    }
    if (!password) {
        return res.send({
            success: false,
            message: 'Error: Password cannot be blank.'
        });
    }
    if (!(name.length > 2 && name.length < 20) || !name.match(/^([a-zA-Z]+\s)*[a-zA-Z]+$/)){
        return res.send({
            success: false,
            message: 'invalid name format or length'
        });
    }
    if (!email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
        return res.send({
            success: false,
            message: 'invalid email format'
        });
    }
    if (!(username.length > 4 && username.length < 20) || !name.match(/^[a-zA-Z0-9]+$/)){
        return res.send({
            success: false,
            message: 'invalid username format or length'
        });
    }
    if (!(username.length > 6 && username.length < 30)){
        return res.send({
            success: false,
            message: 'invalid password length'
        });
    }


    const newUser = new User({username, name, email});
    newUser.password = newUser.generateHash(password);

    newUser.save()
        .then(() => res.json("User Added!"))//just returns the string user added
        .catch(err => res.status(400).json('Error: ' + err));

});



module.exports = router;

//TODO test form validation
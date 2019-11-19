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

    const newUser = new User({username, name, email});
    newUser.password = newUser.generateHash(password);

    newUser.save()
        .then(() => res.json("User Added!"))//just returns the string user added
        .catch(err => res.status(400).json('Error: ' + err));

});

// router.route('/signin').post((req,res) => {
//     const password = req.body.password;
//     let username = req.body.username;
//
//     if (!username) {
//         return res.send({
//             success: false,
//             message: 'Error: username cannot be blank.'
//         });
//     }
//
//     if (!password) {
//         return res.send({
//             success: false,
//             message: 'Error: Password cannot be blank.'
//         });
//     }
//
//     username = username.trim();
//     User.find({ //find field username from username field in user collection
//         username: username
//     }, (err, users) => {
//         if (err) {
//             console.log('err 2:', err);
//             return res.send({
//                 success: false,
//                 message: 'Error: server error'
//             });
//         }
//         if (users.length !== 1) {//if there is more than one person with that username
//             return res.send({
//                 success: false,
//                 message: 'Error: Invalid'
//             });
//         }
//         const user = users[0];
//         if (!user.validPassword(password)) {
//             return res.send({
//                 success: false,
//                 message: 'Error: Invalid'
//             });
//         }
//         // Otherwise correct user
//         const userSession = new UserSession();
//         userSession.userId = user._id;
//         userSession.save((err, doc) => {
//             if (err) {
//                 console.log(err);
//                 return res.send({
//                     success: false,
//                     message: 'Error: server error'
//                 });
//             }
//             return res.send({
//                 success: true,
//                 message: 'Valid sign in',
//                 token: doc._id
//             });
//         });
//     });
// });
//
// router.route('/logout').get((req,res) => {
//     // Get the token
//     const { query } = req;
//     const { token } = query;
//     // ?token=test
//     // Verify the token is one of a kind and it's not deleted.
//     UserSession.findOneAndUpdate({
//         _id: token,
//         isDeleted: false
//     }, {
//         $set: {
//             isDeleted:true
//         }
//     }, null, (err, sessions) => {
//         if (err) {
//             console.log(err);
//             return res.send({
//                 success: false,
//                 message: 'Error: Server error'
//             });
//         }
//         return res.send({
//             success: true,
//             message: 'Good'
//         });
//     });
// });
//
// router.route('/verify').get((req,res) => {
//     // Get the token
//     const { query } = req;
//     const { token } = query;
//     // ?token=test
//     // Verify the token is one of a kind and it's not deleted.
//     UserSession.find({
//         _id: token,
//         isDeleted: false
//     }, (err, sessions) => {
//         if (err) {
//             console.log(err);
//             return res.send({
//                 success: false,
//                 message: 'Error: Server error'
//             });
//         }
//         if (sessions.length !== 1) {
//             return res.send({
//                 success: false,
//                 message: 'Error: Invalid'
//             });
//         } else {
//             // DO ACTION
//             return res.send({
//                 success: true,
//                 message: 'Good'
//             });
//         }
//     });
// });



module.exports = router;

//TODO add full form validation
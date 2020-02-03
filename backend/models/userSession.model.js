/**
 * A model for each document in the usersession collection
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Sets possible fields for a user session
const UserSessionSchema = new Schema({
    userid: {type: String, default: ''},
    timestamp: {type: Date, default: Date.now()},
    isDeleted: {type: Boolean, default: false}
});

UserSessionSchema.statics.verifySession = (sessionID, username, callback) => {
    return UserSession.findOne({_id: sessionID}, (err,session)=>{
        if(err) callback('Session does not exist');
        else if(session.isDeleted) callback('Session is no longer valid');
        else mongoose.model('User').findOne({_id: session.userid}, (err, user)=>{
            if(user.username !== username) callback('Username does not match session');
            else callback(null, user);
        })
    })
};

const UserSession = mongoose.model('UserSession', UserSessionSchema);
module.exports = UserSession;
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

const UserSession = mongoose.model('UserSession', UserSessionSchema);
module.exports = UserSession;
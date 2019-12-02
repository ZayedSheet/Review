const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;
const userSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
      type: String,
      required: true,
      unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
});

/**
 * method that takes in a password and returns a hash for that password
 * @param password password to encrypt
 */
userSchema.methods.generateHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

/**
 * function to check if password is valid for a user
 * @param password password passed in to test
 */
userSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
const mongoose = require('mongoose');
const bycrypt = require('bcrypt');

const Schema = mongoose.Schema;
const userSchema = new Schema({
    displayName:{
        type: String,
        required: true,
    },
    userEmail:{
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
    userPassword: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
});

userSchema.methods.generateHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
userSchema.methods.validPassword = (password) => {
    return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        max: 255
    },
    lastName: {
        type: String,
        max: 255
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
    },
    passwordSalt: {
        type: String,
    }
});

module.exports = mongoose.model('users', userSchema);
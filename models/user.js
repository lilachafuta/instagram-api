const mongoose = require('mongoose');

mongoose.model('User', {
    name: String,
    username: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            return value.length > 4;
        },
    },
    password: String,
    birthDate: Date,
    gender: {
        type: String,
        enum: ['f', 'm']
    },
    about: String,
    created: {type: Date, default:Date.now}
});
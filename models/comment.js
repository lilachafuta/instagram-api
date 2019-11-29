const mongoose = require('mongoose');

mongoose.model('Comment', {
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    message: String,
    date: Date
});
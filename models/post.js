const mongoose = require('mongoose');

mongoose.model('Post', {
    title: String,
    picture: String,
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    tags: [String],
    likers: [{
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
    }],
    comments: [String],
    created: {type: Date, default:Date.now}
});
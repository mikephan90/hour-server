const mongoose = require('mongoose');

const bookmarkSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    bID: {
        type: String,
        default: ''
    }
});

mongoose.model('Bookmark', bookmarkSchema);
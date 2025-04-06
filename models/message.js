const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    text: {
        type:String,
        required: true
    },
    senderId: {
        type:String,
        required: true
    },
    username: {
        type: String,
        default: 'Anonymous'
    },
    timestamp: {
        type:Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Message', MessageSchema);
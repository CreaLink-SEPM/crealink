const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String

    },
    content: {
        type: String,
        required: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    likedUser: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    likes: {
        type: [String],
        default: []
    },
    liked: {
        type: Boolean,
        default: false
    },
    comments: {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }
},
{timestamps: true});
module.exports = mongoose.model('Post', postSchema);
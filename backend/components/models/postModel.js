const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: 'string',
        required: true
    },
    imageUrl: {
        type: 'string',
        required: true

    },
    content: {
        type: 'string',
        required: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},
{timestamps: true});
module.exports = mongoose.model('Post', postSchema);
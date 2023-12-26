const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reportedSchema = new Schema({
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    reporter: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    adminDecision: {
        type: String,
        enum: ["pending", "delete", "keep"],
        default: "pending"
    },
    reportReason: {
        type: String,
        required: true
    },
    reportedAt: {
        type: Date,
        default: Date.now()
    }
});
module.exports = mongoose.model('ReportedPost', reportedSchema);
const {validationResult} = require('express-validator');
const Comment = require('../models/commentModel');
const Post = require('../models/postModel');

exports.createComment = async (req, res, next) =>  {
    try {
        const postId = req.params.postId;
        const post = await Post.findById(postId);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error('Validation failed, entered data is empty');
            error.statusCode = 422;
            throw error;
        }
        if (!post) {
            const error = new Error('Could not find post');
            error.statusCode = 404;
            throw error;
        }
        const commentText= req.body.commentText;
        const comment = new Comment({
            postId: postId,
            userId: req.userId,
            commentText: commentText
        })
        await comment.save();
        res.status(200).json({
            message: 'Comments created successfully',
            comment: comment
        })
        
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}
exports.getComments = async (req, res, next) => {
    try {
        const postId = req.params.postId;
        const comments = await Comment.find({postId: postId})
            .select('userId commentText')
            .exec();
        if (!comments) {
            const error = new Error ('Comments retreived failure');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            message: 'Comments retrieved successfully',
            comment: comments
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}
exports.editComment = async (req, res, next) => {
    try {
        const commentId = req.params.commentId;
        const {commentText} = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error('Validation failed, entered data is empty');
            error.statusCode = 422;
            throw error;
        }
        const comment = await Comment.findByIdAndUpdate(
            commentId,
            {commentText},
            {new: true}
        )
        res.status(200).json({
            message: 'Comment updated successfully',
            comment
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}
exports.deleteComment = async (req, res, next) => {
    try {
        const commentId = req.params.commentId;
        const comment = await Comment.findById(commentId);
        if (!comment) {
            const error = new Error('Comment retrieved failure');
            error.statusCode = 404;
            throw error;
        }
        await Comment.findByIdAndDelete(commentId);
        res.status(200).json({
            message: 'Comment deleted successfully'
        })


    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}
const {validationResult} = require('express-validator');
const Comment = require('../models/commentModel');
const Post = require('../models/postModel');
const io = require('../../socket')

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
        io.getIO().emit('comments', {
            action: 'create',
            comment: {...comment}
        });
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
            .populate("userId", "username")
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
        if (comment.userId.toString() !== req.userId) {
            const error = new Error('Not authorized to edit this comment');
            error.statusCode = 403;
            throw error;
        }
        await comment.save();
        io.getIO().emit('comments', {action: "update", comment});
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
        if (comment.userId.toString() !== req.userId) {
            const error = new Error('Not authorized to delete this comment');
            error.statusCode = 403;
            throw error;
        }
        await Comment.findByIdAndDelete(commentId);
        io.getIO().emit('comments', {action: 'delete', comment: commentId});
        res.status(200).json({
            message: 'Comment deleted successfully'
        })


    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};
exports.toggleLike = async (req, res, next) => {
    try {
        const commentId = req.params.commentId;
        const comment = await Comment.findById(commentId);
        if (!comment) {
            const error = new Error('Comment retrieved failure');
            error.statusCode = 404;
            throw error;
        }
        const currentUserId = req.userId;
        if (!currentUserId) {
            return res.status(401).json({
                message: 'User not found',
                status: 'error'
            });
        };
        if (comment.likes.includes(currentUserId)) {
            comment.likes = comment.likes.filter((id) => id !== currentUserId);
            await comment.save();
            io.getIO().emit(('comments', {action: 'unliked', user: currentUserId, comment: comment}));
            return res.status(200).json({
                message: 'Successfully unliked the comment'
            })
        } else {
            await post.likes.push(currentUserId);
            await comment.save();   
            o.getIO().emit(('comments', {action: 'liked', user: currentUserId, comment: comment}));
            res.status(200).json({
                message: 'Successfully liked the comment'
            })
        }

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}
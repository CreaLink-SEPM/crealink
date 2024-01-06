const {validationResult} = require('express-validator');
const Comment = require('../models/commentModel');
const Post = require('../models/postModel');
const io = require('../../socket');

exports.createComment = async (req, res, next) =>  {
    try {
        const postId = req.params.postId;
        const post = await Post.findById(postId);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({
                status: "error",
                "message": "Validation failed, entered data is empty"
            })
        }
        if (!post) {
            res.status(404).json({
                status: "error",
                message: "Could not find post"
            })
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
        console.log(err); 
        return res.status(500).json({
          status: "error", 
          message: "Internal Server Error: Please try again later"
        })
}}
exports.getComments = async (req, res, next) => {
    try {
        const postId = req.params.postId;
        const comments = await Comment.find({postId: postId})
            .select('userId commentText likes')
            .populate("userId", "username user_image")
            .exec();
        if (!comments) {
            res.status(404).json({
                status: "error",
                message: "Comments retreived failure"
            })
        }
        const commentWithLikesCount = comments.map(comment => ({
            _id: comment._id,
            userId: comment.userId,
            commentText: comment.commentText,
            likesCount: comment.likes.length,
        }));

        res.status(200).json({
            message: 'Comments retrieved successfully',
            comments: commentWithLikesCount
        });
    } catch (err) {
        console.log(err); 
        return res.status(500).json({
          status: "error", 
          message: "Internal Server Error: Please try again later"
        })
    }
}
exports.editComment = async (req, res, next) => {
    try {
        const commentId = req.params.commentId;
        const {commentText} = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({
                status: "error",
                message: "Validation failed, entered data is empty"
            })
        }
        const comment = await Comment.findByIdAndUpdate(
            commentId,
            {commentText},
            {new: true}
        )
        if (comment.userId.toString() !== req.userId) {
            res.status(403).json({
                status: "error",
                message: "Not authorized to edit this comment"
            })
        }
        await comment.save();
        io.getIO().emit('comments', {action: "update", comment});
        res.status(200).json({
            message: 'Comment updated successfully',
            comment
        })
    } catch (err) {
        console.log(err); 
        return res.status(500).json({
          status: "error", 
          message: "Internal Server Error: Please try again later"
        })
    }
}
exports.deleteComment = async (req, res, next) => {
    try {
        const commentId = req.params.commentId;
        const comment = await Comment.findById(commentId);
        if (!comment) {
            res.status(404).json({
                status: "error",
                message: "Comment retrieved failure"
            })
        }
        if (comment.userId.toString() !== req.userId) {
            res.status(403).json({
                status: "error",
                message: "Not authorized to delete this comment"
            })
        }
        await Comment.findByIdAndDelete(commentId);
        io.getIO().emit('comments', {action: 'delete', comment: commentId});
        res.status(200).json({
            message: 'Comment deleted successfully'
        })


    } catch (err) {
        console.log(err); 
        return res.status(500).json({
          status: "error", 
          message: "Internal Server Error: Please try again later"
        })
    }
};
exports.toggleLike = async (req, res, next) => {
    try {
        const commentId = req.params.commentId;
        const comment = await Comment.findById(commentId);
        if (!comment) {
            res.status(404).json({
                status: "error",
                message: "Comment retrieved failure"
            })
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
            await comment.likes.push(currentUserId);
            await comment.save();   
            io.getIO().emit(('comments', {action: 'liked', user: currentUserId, comment: comment}));
            res.status(200).json({
                message: 'Successfully liked the comment'
            })
        }

    } catch (err) {
        console.log(err); 
        return res.status(500).json({
          status: "error", 
          message: "Internal Server Error: Please try again later"
        })
    }
}
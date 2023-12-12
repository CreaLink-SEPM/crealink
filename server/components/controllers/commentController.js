const Comment = require('../models/commentModel');
const Post = require('../models/postModel');

exports.createComment = async (req, res, next) =>  {
    try {
        const postId = req.params.postId;
        const post = await Post.findById(postId);
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
        post.comments.push(comment);
        await post.save();
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
        if (!comments || comments.length === 0) {
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
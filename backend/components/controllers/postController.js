const fs = require('fs');
const path = require('path');
const Post = require('../models/postModel');
const User = require('../models/userModel');
const {validationResult} = require('express-validator');

exports.createPost = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error('Validation failed, entered data is not correct');
            error.statusCode = 422;
            throw error;
        }
        const title = req.body.title;
        const content = req.body.content;
        const imageUrl = req.file.path;
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(401).json({
                message: 'User not found',
                status: 'error'
            })
        }
        const post = new Post({
            title: title,
            content: content,
            imageUrl: imageUrl,
            creator: req.userId
        });
        const result = await post.save();
        const creator = user;
        user.posts.push(post);
        await user.save();
        res.status(201).json({
            message: 'Post created successfully',
            posts: post,
            creator: {_id: creator._id, name: creator.username}
        })
    }
    catch (err) {
        console.log(err);
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err);
    }
}
exports.getPosts = async (req, res, next) => {
    try {
        const posts = await Post.find();
        res.status(200).json({
            message: 'Fetched post successfully',
            posts: posts
        })
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err);
    }

}
exports.updatePost = async (req, res, next) => {
    try {
        const postId = req.params.postId;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error('Validation failed, entered data is not correct');
            error.statusCode = 422;
            throw error;
        }

        const title = req.body.title;
        const content = req.body.content;
        let imageUrl = req.body.image;

        if (req.file) {
            imageUrl = req.file.path;
        }

        const post = await Post.findById(postId);
        if (!post) {
            const error = new Error('Could not find post');
            error.statusCode = 404;
            throw error;
        }

        // Update image only if a new image is provided
        if (imageUrl && imageUrl !== post.imageUrl) {
            // Delete old image
            clearImage(post.imageUrl);
            post.imageUrl = imageUrl;
        }

        if (post.creator.toString() !== req.userId) {
            const error = new Error('Not authorized');
            error.statusCode = 403;
            throw error;
        }

        // Update other attributes
        post.title = title;
        post.content = content;

        const result = await post.save();
        res.status(200).json({
            message: 'Post updated successfully',
            post: result
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

const clearImage = filePath => {
    filePath = path.join(__dirname, '..', filePath);
    fs.unlink(filePath, (err) => {
        if (err) {
            console.log('Error deleting image: ', err);
        } else {
            console.log('Image deleted successfully');
        }
    })
}
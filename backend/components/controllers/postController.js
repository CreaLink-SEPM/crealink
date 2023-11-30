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
        creator.posts.push(post);
        await user.save();
        res.status(201).json({
            message: 'Post created successfully',
            post: post,
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
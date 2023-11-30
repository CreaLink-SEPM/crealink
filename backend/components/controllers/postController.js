const fs = require('fs');
const path = require('path');
const Post = require('../models/postModel');
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

    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err);
    }
}

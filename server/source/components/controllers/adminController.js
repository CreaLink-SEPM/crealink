const ReportedPost = require("../models/reportedPost");
const Post = require('../models/postModel');
const { reportPost } = require("./postController");

exports.adminDecision = async (req, res, next) => {
    try {
        const id = req.params.id;
        const {decision} = req.body;

        const reportedPost = await ReportedPost.findById(id);
        if (!reportedPost) {
            const error = new Error("Reported post not found");
            error.statusCode = 404;
            throw error;
        }
        reportedPost.adminDecision = decision;
        if (decision === 'delete') {
            await ReportedPost.findByIdAndDelete(id);
            await Post.findByIdAndDelete(reportedPost.postId);
            res.status(201).json({
                message: 'Reported post deleted'
            })
        } else if (decision === 'keep') {
            await ReportedPost.findByIdAndDelete(id);
            res.status(201).json({
                message: 'Report post kept'
            })
        }
        
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}
exports.getReportedPosts = async (req, res, next) => {
    try {
        const reportedPosts  = await ReportedPost.find();
        res.status(200).json({
            message: 'Fetched reported posts successfully',
            reportedPosts: reportedPosts
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};
const ReportedPost = require("../models/reportedPost");
const Post = require('../models/postModel');
const { reportPost } = require("./postController");

exports.adminDecision = async (req, res, next) => {
    try {
        const postId = req.params.reportedPostId;
        const {decision} = req.body;

        const reportedPost = await ReportedPost.findById(postId);
        if (!reportedPost) {
            const error = new Error("Reported post not found");
            error.statusCode = 404;
            throw error;
        }
        reportedPost.adminDecision = decision;
        if (decision === 'delete') {
            await ReportedPost.findByIdAndDelete(postId);
            await Post.findByIdAndDelete(reportPost.postId);
            res.status(201).json({
                message: 'Reported post deleted'
            })
        } else if (decision === 'keep') {
            await ReportedPost.findByIdAndDelete(postId);
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
        const reportedPosts  = await ReportedPost.findAll();
        res.status(200).sjon({
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
const fs = require("fs");
const path = require("path");
const Post = require("../models/postModel");
const User = require("../models/userModel");
const Comment = require("../models/commentModel");
const ReportedPost = require("../models/reportedPost");
const io = require("../../socket");
const { validationResult } = require("express-validator");
const {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
const dotenv = require("dotenv");
const uuid = require("uuid");
const client = new S3Client({ region: process.env.AWS_REGION });
const {openai} = require('../configs/openai');

const initializeAssistant = async (req, res, next) => {
  try {
    assistant = await openai.beta.assistants.retrieve("asst_mmrF48IWoAZBEJnXvHlIzoii");
    const thread = await openai.beta.threads.create();
    console.log("OpenAI assistant initialized");
  } catch (err) {
    console.log("Error initializing assistant: " + err.message)
  }
}
initializeAssistant();


exports.startMessage = async (req, res, next) => {
    try {
      const prompt = req.body.prompt;
      const respone = await openai.createCompletion({
        model: "text-davinci-003",
        prompt
      });
      const completion = respone.data.choices[0].text;
      return res.status(200).json({
        success: true,
        message: completion
      })
    } catch (err) {
      console.log(err);
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
  }
    
}
exports.createPost = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed, entered data is not correct");
      error.statusCode = 422;
      throw error;
    }
    const title = req.body.title;
    const content = req.body.content;
    let imageUrl;
    if (req.file) {
      const image = req.file.path;
      const fileExtension = path.extname(req.file.originalname);
      const stream = fs.createReadStream(image);
      const S3FileName = `images/${uuid.v4()}-${new Date().toISOString()}${fileExtension}`;
      const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: S3FileName,
        Body: stream,
      };
      const uploadResult = await client.send(new PutObjectCommand(params));
      imageUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${S3FileName}`;
      await fs.unlinkSync(image);
    }

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(401).json({
        message: "User not found",
        status: "error",
      });
    }
    const post = new Post({
      title: title,
      content: content,
      imageUrl: imageUrl,
      creator: req.userId,
    });
    const result = await post.save();
    const creator = user;
    user.posts.push(post);
    await user.save();
    io.getIO().emit("posts", {
      action: "create",
      post: { ...post, creator: { _id: req.userId, name: user.name } },
    });
    res.status(201).json({
      message: "Post created successfully",
      posts: post,
      creator: { _id: creator._id, name: creator.username },
    });
  } catch (err) {
    console.log(err);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getPosts = async (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = 10;
  try {
    const totalItems = await Post.find().countDocuments();
    const posts = await Post.find()
      .populate("creator", ["username", "user_image"])
      .sort({ createdAt: -1 })
      .skip((currentPage - 1) * perPage)
      .limit(perPage);
    const postLikes = await Promise.all(
      posts.map(async (post) => {
        const likesCount = post.likes.length;
        const commentsCount = await Comment.countDocuments({postId: post._id});
        const { likes, ...postWithoutLikes } = post.toObject();
        return {
          ...postWithoutLikes,
          likesCount,
          commentsCount
        };
      })
    );
    res.status(200).json({
      message: "Fetched post successfully",
      posts: postLikes,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getPost = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findById(postId).populate("creator", ["username", "user_image"]);

    if (!post) {
      const error = new Error("Could not find post");
      error.statusCode = 403;
      throw error;
    }
    const likesCount = post.likes.length;
    const { likes, ...postWithoutLikes } = post.toObject();
    const commentCount = await Comment.countDocuments({ postId: post._id });
    res.status(200).json({
      message: "Post fetched successfully",
      post: {
        ...postWithoutLikes,
        likesCount,
        commentCount
      },
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getLikes = async (req, res, next) => {
  const postId = req.params.postId;
  try {
    const post = await Post.findById(postId);
    if (!post) {
      const error = new Error("Could not find post");
      error.statusCode = 404;
      throw error;
    }
    const likesArray = post.likes;
    const likedUsers = await User.find(
      { _id: { $in: likesArray } },
      ["username", "user_image"]
    );
    res.status(200).json({
      message: "Fetched liked users successfully",
      post: {
        likedUsers,
      },
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.updatePost = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findById(postId);
    if (!post) {
      const error = new Error("Could not find post");
      error.statusCode = 404;
      throw error;
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed, entered data is not correct");
      error.statusCode = 422;
      throw error;
    }

    if (post.creator.toString() !== req.userId) {
      const error = new Error("Not authorized");
      error.statusCode = 403;
      throw error;
    }

    const title = req.body.title;
    const content = req.body.content;
    let imageUrl = req.body.image;
    if (req.file) {
      const image = req.file.path;
      const oldImageUrl = post.imageUrl;
      if (imageUrl !== oldImageUrl) {
        // Delete old image
        await clearImageFromS3(post.imageUrl);
      }
      const fileExtension = req.file.originalname;
      const newS3FileName = `images/${uuid.v4()}-${new Date().toISOString()}${fileExtension}`;
      const uploadParams = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: newS3FileName,
        Body: fs.createReadStream(image),
      };
      const uploadResult = await client.send(
        new PutObjectCommand(uploadParams)
      );
      imageUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${newS3FileName}`;
      await fs.unlinkSync(image);
    }

    if (post.creator.toString() !== req.userId) {
      const error = new Error("Not authorized");
      error.statusCode = 403;
      throw error;
    }
    post.title = title;
    post.content = content;
    post.imageUrl = imageUrl;

    const result = await post.save();
    io.getIO().emit("posts", { action: "update", post: result });
    res.status(200).json({
      message: "Post updated successfully",
      post: result,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findById(postId);
    if (!post) {
      const error = new Error("Could not find post");
      error.statusCode = 404;
      throw error;
    }
    if (post.creator.toString() !== req.userId) {
      const error = new Error("Not authorized");
      error.statusCode = 403;
      throw error;
    }
    if (post.imageUrl) {
      await clearImageFromS3(post.imageUrl);
    }

    await Post.findByIdAndDelete(postId);
    const user = await User.findById(req.userId);
    user.posts.pull(postId);
    await user.save();
    io.getIO().emit("posts", { action: "delete", post: postId });
    res.status(200).json({
      message: "Delete post successfully",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.sharePost = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findById(postId);
    if (!post) {
      const error = new Error("Could not find post");
      error.statusCode = 422;
      throw error;
    }
    const shareableUrl = `${req.protocol}://${req.get("host")}/posts/${
      post._id
    }`;
    res.status(200).json({
      message: "Share post URL successfully",
      shareableUrl: shareableUrl,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }

    next(err);
  }
};

exports.toggleLike = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findById(postId);
    if (!post) {
      const error = new Error("Could not find post");
      error.statusCode = 404;
      throw error;
    }
    const currentUserId = req.userId;
    if (!currentUserId) {
      return res.status(401).json({
        message: "User not found",
        status: "error",
      });
    }
    if (post.likes.includes(currentUserId)) {
      post.likes = post.likes.filter((id) => id !== currentUserId);
      await post.save();
      io.getIO().emit(
        ("posts", { action: "unliked", user: currentUserId, post: post })
      );
      return res.status(200).json({
        message: "Successfully unliked the post",
      });
    } else {
      await post.likes.push(currentUserId);
      await post.save();
      io.getIO().emit("posts", {
        action: "liked",
        user: currentUserId,
        post: post,
      });
      return res.status(200).json({
        message: "Successfully liked the post",
      });
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }

    next(err);
  }
};

exports.reportPost = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const { reason } = req.body;
    if (!reason) {
      return res.status(400).json({ message: "No report reason provided" });
    }
    const reportedPost = new ReportedPost({
      postId,
      reporter: req.userId,
      reportReason: reason,
    });
    await reportedPost.save();

    io.getIO().emit("report", { action: "report", reportedPost: postId });

    res.status(201).json({
      message: "Post has been reported",
      reportedPost: reportedPost,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

const clearImageFromS3 = async (imageUrl) => {
  if (!imageUrl) {
    console.log("No image URL provided");
    return;
  }
  const key = imageUrl.replace("https://crealink-images.s3.amazonaws.com/", "");
  try {
    const deleteParams = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: key,
    };
    const deleteResult = await client.send(
      new DeleteObjectCommand(deleteParams)
    );
    console.log("Old image deleted successfully: ", deleteResult);
  } catch (err) {
    console.log("Error deleting image from S3: ", err);
  }
};



const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    user_image: {
      type: String,
      default:
        "https://crealink-images.s3.ap-southeast-1.amazonaws.com/avatar/istockphoto-1451587807-612x612.jpg",
    },
    posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
    following: [
      {
        id: { type: Schema.Types.ObjectId, ref: "User" },
        name: { type: String, required: true },
        username: { type: String },
        user_image: {
          type: String,
          default:
            "https://crealink-images.s3.ap-southeast-1.amazonaws.com/avatar/istockphoto-1451587807-612x612.jpg",
        },
      },
    ],
    followers: [
      {
        id: { type: Schema.Types.ObjectId, ref: "User" },
        name: { type: String, required: true },
        username: { type: String },
        user_image: {
          type: String,
          default:
            "https://crealink-images.s3.ap-southeast-1.amazonaws.com/avatar/istockphoto-1451587807-612x612.jpg",
        },
      },
    ],
    image: { type: String },
    bio: { type: String, default: "" },
    is_verified: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
    posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
    notifications: [
      {
        content: { type: String, required: true },
        postId: { type: Schema.Types.ObjectId, ref: "Post" },
        createdAt: { type: Date, default: Date.now },
        read: { type: Boolean, default: false },
      },
    ],
    savedPosts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  },
  {
    timestamps: true,
  }
);

// Function to add a notification to the user's notifications array
userSchema.methods.addNotification = async function (content, postId) {
  try {
    this.notifications.push({
      content: content,
      postId: postId,
      createdAt: new Date(),
    });
    await this.save();
  } catch (err) {
    console.log("Error adding notification: ", err);
  }
};

// Function to remove a notification from the user's notifications array
userSchema.methods.removeNotification = async function (notificationId) {
  try {
    this.notifications = this.notifications.filter(
      (notification) => notification._id.toString() !== notificationId
    );
    await this.save();
  } catch (err) {
    console.log("Error removing notification: ", err);
  }
};

// Function to add a saved post to the user's savedPosts array
userSchema.methods.addSavedPost = async function (postId) {
  try {
    this.savedPosts.push(postId);
    await this.save();
  } catch (err) {
    console.log("Error adding saved post: ", err);
  }
};

// Function to remove a saved post from the user's savedPosts array
userSchema.methods.removeSavedPost = async function (postId) {
  try {
    this.savedPosts = this.savedPosts.filter(
      (savedPostId) => savedPostId.toString() !== postId
    );
    await this.save();
  } catch (err) {
    console.log("Error removing saved post: ", err);
  }
};

const User = mongoose.model("User", userSchema);

module.exports = User;
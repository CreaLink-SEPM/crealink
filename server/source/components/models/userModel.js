const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false},
    user_image: {type: String, default: 'https://crealink-images.s3.ap-southeast-1.amazonaws.com/avatar/istockphoto-1451587807-612x612.jpg'},
    posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
    following: [{ 
      id: { type: Schema.Types.ObjectId, ref: "User" },
      name: { type: String, required: true },
      username: { type: String },
      user_image: {type: String, default: 'https://crealink-images.s3.ap-southeast-1.amazonaws.com/avatar/istockphoto-1451587807-612x612.jpg'},
    }],
    followers: [{
      id: { type: Schema.Types.ObjectId, ref: "User" },
      name: { type: String, required: true },
      username: { type: String },
      user_image: {type: String, default: 'https://crealink-images.s3.ap-southeast-1.amazonaws.com/avatar/istockphoto-1451587807-612x612.jpg'},
    }],    image: { type: String },
    bio: { type: String, default: "" },
    is_verified: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
    posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
    savedPosts: [{ type: Schema.Types.ObjectId, ref: "Post" }]
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;

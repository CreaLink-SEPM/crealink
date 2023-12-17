const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, index: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, deault: false},
    posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
    following: [{ type: String }],
    followers: [{ type: String }],
    posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],

  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;

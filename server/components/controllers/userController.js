const User = require("../models/userModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Function to create a new user
const registerUser = async (req, res) => {
  try {
    const { email, username, password, name, confirmedPassword } = req.body;
    const errors = {};

    if (!email) {
      errors.email = "The email is required";
    } else {
      const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      if (!emailRegex.test(email)) {
        errors.email = "Invalid email format";
      }
    }

    if (!password) {
      errors.password = "The password is required";
    } else if (password.length < 6) {
      errors.password = "Password should be at least 6 characters long";
    }

    if (!username) {
      errors.username = "The username is required";
    }

    if (!name) {
      errors.name = "The name is required";
    }

    if (!confirmedPassword) {
      errors.confirmedPassword = "The confirmed password is required";
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        status: "error",
        message: { error: errors },
      });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({
        status: "error",
        message: { error: { email: "The email is already in use" } },
      });
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({
        status: "error",
        message: { error: { username: "The username is already in use" } },
      });
    }

    if (password !== confirmedPassword) {
      return res.status(400).json({
        status: "error",
        message: { error: { confirmedPassword: "Passwords do not match" } },
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = await User.create({
      name,
      username,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      status: "success",
      message: "User successfully created",
      data: createdUser,
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

// Function to log in a user
const loginUser = async (req, res) => {
  try {
    // Clear any existing tokens
    res.setHeader("accessToken", "");
    res.setHeader("refreshToken", "");

    const { email, password } = req.body;

    if (!password || !email) {
      return res.status(400).json({
        status: "error",
        message: "Both email and password are required fields",
      });
    }

    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        status: "error",
        message: "Invalid email or password",
      });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    storeRefreshToken(refreshToken);

    return res.status(200).json({
      status: "success",
      message: "Login successful",
      accessToken,
      refreshToken,
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

// Function to generate access token
const generateAccessToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      username: user.username,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "10h" }
  );
};

// Function to generate refresh token
const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      username: user.username,
      email: user.email,
    },
    process.env.REFRESH_TOKEN_SECRET
  );
};

let refreshTokens = [];

// Function to store refresh token
const storeRefreshToken = (token) => {
  refreshTokens.push(token);
};

// Function to refresh user's access token
const refreshTokenUser = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.sendStatus(401);

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, data) => {
      if (err) return res.sendStatus(403);

      const accessToken = generateAccessToken(data);

      // Remove old access token from header
      res.setHeader("accessToken", accessToken);

      res.status(200).json({ status: "success", accessToken });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to log out a user
const logoutUser = async (req, res) => {
  try {
    refreshTokens = [];
    // Clear tokens from headers
    res.setHeader("accessToken", "");
    res.setHeader("refreshToken", "");
    return res
      .status(200)
      .json({ status: "OK", message: "User logged out successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAllUser = async (req, res, next) => {
  res.json({ status: "success", data: "YESSSSSSSSSSS" });
};

const getUser = async (req, res, next) => {
  try {
    const { username: requestedUsername } = req.params;

    if (!requestedUsername) {
      return res.status(400).json({
        status: "error",
        message: "Username is required",
      });
    }

    const user = await User.findOne({ username: requestedUsername });

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    const { _id, name, email, username } = user;
    return res.status(200).json({
      status: "success",
      data: {
        _id,
        name,
        email,
        username,
      },
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}, { password: 0 });

    return res.status(200).json({
      status: "success",
      data: users,
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

const searchUser = async (req, res) => {
  try {
    const { searchQuery } = req.params;

    if (!searchQuery) {
      return res.status(400).json({
        status: "error",
        message: "Search query is required",
      });
    }

    const users = await User.find({
      $or: [
        { username: { $regex: searchQuery, $options: "i" } },
        { name: { $regex: searchQuery, $options: "i" } },
      ],
    });

    if (!users || users.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "No users found",
      });
    }

    // Map user data to include necessary information including random follower images (up to 3)
    const usersData = users.map(user => {
      const followersCount = user.followers.length;
      const followerImages = [];

      // Select up to 3 random followers' images
      if (followersCount > 0) {
        const randomIndexes = Array.from(
          { length: Math.min(followersCount, 3) },
          () => Math.floor(Math.random() * followersCount)
        );

        randomIndexes.forEach(index => {
          const follower = user.followers[index];
          if (follower && follower.image) {
            followerImages.push(follower.image);
          }
        });
      }

      return {
        _id: user._id,
        username: user.username,
        name: user.name,
        email: user.email,
        image: user.image,
        followers: followersCount,
        follower_images: followerImages,
        is_verified: user.is_verified,
      };
    });

    return res.status(200).json({
      status: "success",
      data: usersData,
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

const followUser = async (req, res) => {
  try {
    const { user_id } = req.params; // User ID to follow
    const { userId } = req.body; // User ID of the user initiating the follow action (Assuming this is extracted from the token)

    if (!user_id) {
      return res.status(400).json({
        status: "error",
        message: "User ID to follow is required",
      });
    }

    const userToFollow = await User.findById(user_id);
    const user = await User.findById(userId);

    if (!userToFollow || !user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    if (userToFollow.followers.includes(userId)) {
      return res.status(400).json({
        status: "error",
        message: "You are already following this user",
      });
    }

    // Update following for the user initiating the follow action
    user.following.push(userToFollow._id);
    await user.save();

    // Update followers for the user being followed
    userToFollow.followers.push(userId);
    await userToFollow.save();

    return res.status(200).json({
      status: "success",
      message: "Successfully followed user",
      data: {
        userToFollow,
      },
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

const unfollowUser = async (req, res) => {
  try {
    const { user_id } = req.params; // User ID to unfollow
    const { userId } = req.body; // User ID of the user initiating the unfollow action (Assuming this is extracted from the token)

    if (!user_id) {
      return res.status(400).json({
        status: "error",
        message: "User ID to unfollow is required",
      });
    }

    const userToUnfollow = await User.findById(user_id);
    const user = await User.findById(userId);

    if (!userToUnfollow || !user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    if (!userToUnfollow.followers.includes(userId)) {
      return res.status(400).json({
        status: "error",
        message: "You are not following this user",
      });
    }

    // Remove userId from follows list of userToUnfollow
    userToUnfollow.followers = userToUnfollow.followers.filter(
      (followerId) => followerId.toString() !== userId.toString()
    );
    await userToUnfollow.save();

    // Remove userToUnfollow from following list of the user initiating the unfollow action
    user.following = user.following.filter(
      (followedUser) =>
        followedUser.toString() !== userToUnfollow._id.toString()
    );
    await user.save();

    return res.status(200).json({
      status: "success",
      message: "Successfully unfollowed user",
      data: {
        userToUnfollow,
      },
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

const getFollowers = async (req, res) => {
  try {
    const { user_id } = req.params; // User ID to fetch followers

    if (!user_id) {
      return res.status(400).json({
        status: "error",
        message: "User ID is required",
      });
    }

    const user = await User.findById(user_id).populate(
      "followers",
      "username name"
    );

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    return res.status(200).json({
      status: "success",
      data: user.followers,
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

const getFollowing = async (req, res) => {
  try {
    const { user_id } = req.params; // User ID to fetch followed users

    if (!user_id) {
      return res.status(400).json({
        status: "error",
        message: "User ID is required",
      });
    }

    const user = await User.findById(user_id).populate(
      "following",
      "username name"
    );

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    return res.status(200).json({
      status: "success",
      data: user.following,
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

const profileUser = async (req, res) => {
  try {
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({
        status: "error",
        message: "Username is required",
      });
    }

    const user = await User.findOne({ username }).populate("posts");

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    const userData = {
      _id: user._id,
      username: user.username,
      name: user.name,
      email: user.email,
      image: user.image,
      followers: user.followers.length,
      following: user.following.length,
      is_verified: user.is_verified,
      isAdmin: user.isAdmin,
      posts: user.posts,
    };

    return res.status(200).json({
      status: "success",
      data: userData,
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getAllUser,
  logoutUser,
  refreshTokenUser,
  getUser,
  getAllUsers,
  searchUser,
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing,
  profileUser
};

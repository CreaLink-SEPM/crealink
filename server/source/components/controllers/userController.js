const User = require("../models/userModel.js");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
const uuid = require("uuid");
const { CLIENT_RENEG_WINDOW } = require("tls");
const client = new S3Client({ region: process.env.AWS_REGION });
const { enqueueNotification, getIO } = require("../../socket.js");
const Post = require("../models/postModel");

const createNotification = async (user, content) => {
  try {
    user.notifications.push({
      content,
      timestamp: new Date(),
      read: false,
    });
    await user.save();
    const io = getIO();
    enqueueNotification(content);
  } catch (err) {
    console.error("Error creating notification:", err.message);
  }
};

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
      isAdmin: false,
    });

    // Notify the user about the new account
    await createNotification(
      createdUser,
      "Welcome! Your account has been created."
    );

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

// Function to register admin account
const registerAdmin = async (req, res) => {
  try {
    const existingAdmin = await User.findOne({ isAdmin: true });
    if (existingAdmin) {
      return res.status(400).json({
        status: "error",
        message:
          "Admin account already exists. Only one admin account is allowed to be registered.",
      });
    }
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        status: "error",
        message:
          "This email address cannot be used to register as an admin account",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = await User.create({
      username,
      email,
      password: hashedPassword,
      isAdmin: true,
    });
    enqueueNotification("New admin registered!");
    res.status(201).json({
      status: "success",
      message: "Admin account registered successfully",
      data: newAdmin,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

// Function login as admin
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!password || !email) {
      return res.status(400).json({
        status: "error",
        message: "Bpth username or password are required",
      });
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "Admin account not found",
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid || !user.isAdmin) {
      return res.status(401).json({
        status: "error",
        message: "Not authorized to login as admin",
      });
    }
    const adminAccessToken = generateAdminAccessToken(user);
    const adminRefreshToken = generateAdminRefreshToken(user);
    storeRefreshToken(adminRefreshToken);

    return res.status(200).json({
      status: "success",
      message: "Admin login successful",
      accessToken: adminAccessToken,
      refreshToken: adminRefreshToken,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
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

    // Include additional user attributes in the response
    const { username, name, isAdmin, user_image, image, is_verified } = user;
    enqueueNotification("User " + username + " has logged in!");

    // Notify the user about the login
    await createNotification(user, "You have successfully logged in.");

    return res.status(200).json({
      id: user._id,
      status: "success",
      message: "Login successful",
      accessToken,
      refreshToken,
      username,
      name,
      email: user.email,
      isAdmin,
      user_image,
      image,
      is_verified,
      followers: user.followers.length,
      follower: user.followers,
      followings: user.following.length,
      following: user.following,
      posts: user.posts,
      bio: user.bio,
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

// Function to generate admin access token
const generateAdminAccessToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: true,
    },
    process.env.JWT_SECRET,
    { expiresIn: "10h" }
  );
};
// Function to generate admin refresh token
const generateAdminRefreshToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: true,
    },
    process.env.REFRESH_TOKEN_SECRET
  );
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
    const { username: requestedUserID } = req.params;

    if (!requestedUserID) {
      return res.status(400).json({
        status: "error",
        message: "User ID is required",
      });
    }

    const user = await User.findOne({ _id: requestedUserID });

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    return res.status(200).json({
      status: "success",
      data: {
        id: user._id,
        accessToken: user.accessToken,
        refreshToken: user.refreshToken,
        username: user.username,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        user_image: user.user_image,
        image: user.image,
        is_verified: user.is_verified,
        followers: user.followers.length,
        follower: user.followers,
        followings: user.following.length,
        following: user.following,
        posts: user.posts,
        bio: user.bio,
      },
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

const getUserNotification = async (req, res, next) => {
  try {
    const { username: requestedUserID } = req.params;

    if (!requestedUserID) {
      return res.status(400).json({
        status: "error",
        message: "User ID is required",
      });
    }

    const user = await User.findOne({ _id: requestedUserID });

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    const notifications = await Promise.all(
      user.notifications.map(async (notification) => {
        const populatedNotification = { ...notification._doc };

        if (notification.postId) {
          const post = await Post.findById(notification.postId);
          populatedNotification.post = post;
        }

        if (notification.likerId) {
          const liker = await User.findById(notification.likerId);
          populatedNotification.liker = {
            _id: liker._id,
            username: liker.username,
            user_image: liker.user_image,
          };
          delete populatedNotification.liker.notifications;
        }

        return populatedNotification;
      })
    );

    return res.status(200).json({
      status: "success",
      data: {
        notifications: notifications,
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
    const { searchQuery } = req.query;

    if (!searchQuery) {
      return res.status(400).json({
        status: "error",
        message: "Search query is required",
      });
    }

    const currentUser = req.userId; // Assuming req.userId is available

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

    const usersData = [];

    for (const user of users) {
      const followersCount = user.followers.length;
      const followerImages = [];

      // Select up to 3 random followers' images
      if (followersCount > 0) {
        const randomIndexes = Array.from(
          { length: Math.min(followersCount, 3) },
          () => Math.floor(Math.random() * followersCount)
        );

        for (const index of randomIndexes) {
          const follower = user.followers[index];
          if (follower && follower.user_image) {
            followerImages.push(follower.user_image);
          }
        }
      }

      const isFollowed = user.following.some((followedUser) => followedUser.id.toString() === currentUser);

      usersData.push({
        _id: user._id,
        username: user.username,
        name: user.name,
        email: user.email,
        image: user.user_image, // Assuming user image is stored in user_image field
        followers: followersCount,
        follower_images: followerImages,
        is_verified: user.is_verified,
        isFollowed: isFollowed,
      });
    }

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

const profileUser = async (req, res) => {
  try {
    const { username } = req.query;

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
      bio: user.bio,
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

const followUser = async (req, res) => {
  try {
    const { user_id } = req.params; // User ID to follow
    const userId = req.userId; // User ID of the user initiating the follow action (Assuming this is extracted from the token)

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

    if (
      userToFollow.followers.some((follower) => follower._id.equals(userId))
    ) {
      return res.status(400).json({
        status: "error",
        message: "You are already following this user",
        isFollowed: true,
      });
    }

    // Update following for the user initiating the follow action
    user.following.push({
      _id: userToFollow._id,
      name: userToFollow.name,
      username: userToFollow.username,
      user_image: userToFollow.user_image,
    });
    await user.save();

    // Update followers for the user being followed
    userToFollow.followers.push({
      _id: user._id,
      name: user.name,
      username: user.username,
      user_image: user.user_image,
    });
    await userToFollow.save();

    // Notify the user being followed
    await createNotification(
      userToFollow,
      `${user.username} started following you.`
    );

    return res.status(200).json({
      status: "success",
      message: "Successfully followed user",
      data: {
        userToFollow,
        isFollowed: true,
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
    const userId = req.userId; // User ID of the user initiating the unfollow action (Assuming this is extracted from the token)

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

    const isFollowing = userToUnfollow.followers.some(
      (follower) => follower._id.toString() === userId.toString()
    );

    if (!isFollowing) {
      return res.status(400).json({
        status: "error",
        message: "You are not following this user",
        isFollowed: false,
      });
    }

    // Remove userToUnfollow from followers list of user
    userToUnfollow.followers = userToUnfollow.followers.filter(
      (follower) => !follower._id.equals(userId)
    );
    await userToUnfollow.save();

    // Remove user from following list of the user initiating the unfollow action
    user.following = user.following.filter(
      (followedUser) => !followedUser._id.equals(userToUnfollow._id)
    );
    await user.save();

    // Notify the user being unfollowed
    await createNotification(
      userToUnfollow,
      `${user.username} unfollowed you.`
    );

    return res.status(200).json({
      status: "success",
      message: "Successfully unfollowed user",
      data: {
        userToUnfollow,
        isFollowed: false,
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

    const followers = await User.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(user_id) } },
      {
        $lookup: {
          from: "users", // Assuming the collection name is "users"
          localField: "followers._id",
          foreignField: "_id",
          as: "followersInfo",
        },
      },
      { $unwind: "$followersInfo" },
      {
        $project: {
          _id: "$followersInfo._id",
          name: "$followersInfo.name",
          username: "$followersInfo.username",
          user_image: "$followersInfo.user_image",
        },
      },
    ]);

    return res.status(200).json({
      status: "success",
      data: followers,
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

    const following = await User.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(user_id) } },
      {
        $lookup: {
          from: "users", // Assuming the collection name is "users"
          localField: "following._id",
          foreignField: "_id",
          as: "followingInfo",
        },
      },
      { $unwind: "$followingInfo" },
      {
        $project: {
          _id: "$followingInfo._id",
          name: "$followingInfo.name",
          username: "$followingInfo.username",
          user_image: "$followingInfo.user_image",
        },
      },
    ]);

    return res.status(200).json({
      status: "success",
      data: following,
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

const uploadAvatar = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const { userID } = req.params;

    let avatarUrl = ""; // Initialize the avatarUrl variable

    if (req.file) {
      const fileExtension = path.extname(req.file.originalname);
      const stream = fs.createReadStream(req.file.path);
      const avatarFileName = `avatar/${uuid.v4()}-${new Date().toISOString()}${fileExtension}`;
      const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: avatarFileName,
        Body: stream,
      };

      const uploadResult = await client.send(new PutObjectCommand(params));
      avatarUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.ap-southeast-1.amazonaws.com/${avatarFileName}`;

      // Delete the local file after uploading to S3
      fs.unlinkSync(req.file.path);
    }

    // Construct object with fields that need updating
    const updateFields = {};
    if (avatarUrl) updateFields.user_image = avatarUrl; // Add user_image only if avatarUrl is present
    if (username) updateFields.username = username;
    if (email) updateFields.email = email;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10); // Hash the password securely
      updateFields.password = hashedPassword;
    }

    // Update user with the new attributes
    const updatedUser = await User.findByIdAndUpdate(userID, updateFields, {
      new: true,
    });

    // Notify the user about the profile update
    await createNotification(updatedUser, "Profile updated successful.");

    res.status(200).json({
      message: req.file ? "Avatar uploaded successfully" : "No file uploaded", // Inform about file upload status
      notification: "Profile update successful.", // Add notification message to the response
      user: updatedUser,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

const updateAvatar = async (req, res, next) => {
  let avatarUrl = req.body.user_image;
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 422;
      throw error;
    }
    const image = req.file.path;
    const oldAvatarUrl = user.user_image;
    if (avatarUrl !== oldAvatarUrl) {
      await clearImageFromS3(user.user_image);
    }
    const fileExtension = req.file.originalname;
    const newS3FileName = `avatar/${uuid.v4()}-${new Date().toISOString()}${fileExtension}`;
    const uploadParams = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: newS3FileName,
      Body: fs.createReadStream(image),
    };
    const uploadResult = await client.send(new PutObjectCommand(uploadParams));
    avatarUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${newS3FileName}`;
    await fs.unlinkSync(image);
    res.status(200).json({
      message: "Avatar updated sucessfuly",
      user_image: avatarUrl,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
const deleteAvatar = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    await clearImageFromS3(user.user_image);
    user.user_image =
      "https://crealink-images.s3.ap-southeast-1.amazonaws.com/avatar/istockphoto-1451587807-612x612.jpg";
    await user.save();
    res.status(200).json({
      message: "Avatar delete sucessfully",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
const clearImageFromS3 = async (avatarUrl) => {
  if (!avatarUrl) {
    console.log("No image URL provided");
    return;
  }
  const key = avatarUrl.replace(
    "https://crealink-images.s3.amazonaws.com/",
    ""
  );
  try {
    const deleteParams = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: key,
    };
    const deleteResult = await client.send(
      new DeleteObjectCommand(deleteParams)
    );
    console.log("Old avatar deleted successfully: ", deleteResult);
  } catch (err) {
    console.log("Error deleting image from S3: ", err);
  }
};

module.exports = {
  getUserNotification,
  registerUser,
  registerAdmin,
  loginAdmin,
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
  profileUser,
  uploadAvatar,
  updateAvatar,
  deleteAvatar,
};

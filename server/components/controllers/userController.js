const User = require("../models/userModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Function to create a new user
const registerUser = async (req, res) => {
  try {
    const { email, username, password, name, confirmedPassword } = req.body;

    if (!email || !password || !username || !name || !confirmedPassword) {
      return res.status(400).json({
        status: "error",
        message:
          "All fields (username, email, name, password, confirmed password) are required.",
      });
    }

    const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid email format",
      });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({
        status: "error",
        message: "The email is already in use",
      });
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({
        status: "error",
        message: "The username is already in use",
      });
    }

    if (password !== confirmedPassword) {
      return res.status(400).json({
        status: "error",
        message: "The confirmed password does not match the entered password",
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



module.exports = {
  registerUser,
  loginUser,
  getAllUser,
  logoutUser,
  refreshTokenUser,
  getUser,
  getAllUsers,
};

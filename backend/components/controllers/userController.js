const User = require("../models/userModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Function to create a new user
const registerUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body ;
    if (!email || !password || !username) {
      return res.status(400).json({
        status: "error",
        message: "Username, email, and password are required fields",
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

    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = await User.create({ username, email, password: hashedPassword });

    if (createdUser) {
      return res.status(201).json({
        status: "success",
        message: "User successfully created",
        data: createdUser,
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

// Function to log in a user
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!password || !email) {
      return res.status(400).json({
        status: "error",
        message: "Both email and password are required fields",
      });
    }

    const user = await User.findOne({ email});

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
    { expiresIn: "30s" }
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
const refreshTokenUser = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.sendStatus(401);

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, data) => {
      if (err) return res.sendStatus(403);

      const accessToken = generateAccessToken(data);

      res.status(200).json({ status: "success", accessToken });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to log out a user
const logoutUser = async (req, res, next) => {
  try {
    refreshTokens = [];
    return res.status(200).json({ status: "OK", message: "User logged out successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAllUser = async (req, res, next) => {
  res.json({ status: "success", data: "YESSSSSSSSSSS" });
};

module.exports = {
  registerUser,
  loginUser,
  getAllUser,
  logoutUser,
  refreshTokenUser,
};

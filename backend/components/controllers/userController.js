const User = require("../models/userModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const isEmailValid = emailRegex.test(email);

    if (!email || !password || !username) {
      return res.status(400).json({
        status: "error",
        message: "Username, email, and password are required fields",
      });
    } else if (!isEmailValid) {
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

    const hashedPassword = bcrypt.hashSync(password, 10);
    const createdUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

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

const loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!password || !username) {
      return res.status(400).json({
        status: "error",
        message: "Both username and password are required fields",
      });
    }

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "The user does not exist",
      });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        status: "error",
        message: "Incorrect password",
      });
    }

    const accessToken = jwt.sign(
      {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "5m" }
    );

    const refreshToken = jwt.sign(
      {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
      process.env.REFRESH_TOKEN_SECRET
    );

    refreshTokens.push(refreshToken);

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

let refreshTokens = [];

const refreshTokenUser = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.sendStatus(401);

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, data) => {
      if (err) return res.sendStatus(403);

      const accessToken = jwt.sign(
        {
          _id: data._id,
          username: data.username,
          email: data.email,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "5m",
        }
      );

      res.status(200).json({ status: "success", accessToken });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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

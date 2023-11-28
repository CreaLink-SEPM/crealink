const User = require("../models/userModel.js");
const bcrypt = require("bcrypt");

const registerUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const isCheckEmail = reg.test(email);

    if (!email || !password || !username) {
      return res.status(400).json({
        status: "ERR",
        message: "Username, email and password are required fields",
      });
    } else if (!isCheckEmail) {
      return res.status(400).json({
        status: "ERR",
        message: "Invalid email format",
      });
    }

    const checkEmail = await User.findOne({
      email: email,
    });

    if (checkEmail !== null) {
      return res.status(400).json({
        status: "ERR",
        message: "The email is already in use",
      });
    }

    const checkUsername = await User.findOne({
      username: username,
    });

    if (checkUsername !== null) {
      return res.status(400).json({
        status: "ERR",
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
        status: "OK",
        message: "User successfully created",
        data: createdUser,
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: "ERR",
      message: err.message,
    });
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!password || !username) {
      return res.status(400).json({
        status: "ERR",
        message: "Both username and password are required fields",
      });
    }

    const checkUser = await User.findOne({ username: username });

    if (!checkUser) {
      return res.status(404).json({
        status: "ERR",
        message: "The user does not exist",
      });
    }

    const isPasswordValid = bcrypt.compareSync(password, checkUser.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        status: "ERR",
        message: "Incorrect password",
      });
    }

    return res.status(200).json({
      status: "OK",
      message: "Login successful",
    });
  } catch (err) {
    return res.status(500).json({
      status: "ERR",
      message: err.message,
    });
  }
};

module.exports = { registerUser, loginUser };

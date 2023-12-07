const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController.js");
const AuthMiddleware = require("../middlewares/authMiddleware.js");

// User routes
router.post("/register", UserController.registerUser);
router.post("/login", UserController.loginUser);
router.post("/logout", UserController.logoutUser);
router.post("/refresh-token", UserController.refreshTokenUser);
router.get("/get-user/:username", UserController.getUser);
router.get("/get-all-users", UserController.getAllUsers);

module.exports = router;

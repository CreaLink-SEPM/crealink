const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController.js");

// User routes
router.post("/register", UserController.registerUser);
router.post("/login", UserController.loginUser);
router.post("/logout", UserController.logoutUser);
router.post("/refresh-token", UserController.refreshTokenUser);
router.get("/get-user/:username", UserController.getUser);
router.get("/get-all-users", UserController.getAllUsers);
router.get("/search-user/:searchQuery", UserController.searchUser);
router.post("/follow-user/:user_id", UserController.followUser);
router.post("/unfollow-user/:user_id", UserController.unfollowUser);

module.exports = router;

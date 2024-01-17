const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController.js");
const AuthMiddleware = require("../middlewares/authMiddleware");

// User routes
router.post("/register", UserController.registerUser);
router.post("/login", UserController.loginUser);
router.post("/logout", UserController.logoutUser);
router.post("/refresh-token", UserController.refreshTokenUser);
router.get("/get-user/:username", AuthMiddleware.userAuthenToken, UserController.getUser);
router.get("/get-user-notification", AuthMiddleware.userAuthenToken, UserController.getUserNotification);
router.delete("/get-user-notification/:notificationId", AuthMiddleware.userAuthenToken, UserController.deleteNotification);
router.get("/get-all-users", UserController.getAllUsers);
router.get("/search-user", AuthMiddleware.userAuthenToken, UserController.searchUser);
router.get("/get-followers/:user_id", UserController.getFollowers);
router.get("/get-following/:user_id", UserController.getFollowing);
router.post("/follow-user/:user_id", AuthMiddleware.userAuthenToken, UserController.followUser);
router.post("/unfollow-user/:user_id", AuthMiddleware.userAuthenToken, UserController.unfollowUser);
router.get("/profile", UserController.profileUser);
router.post('/avatar/:userID', AuthMiddleware.userAuthenToken, UserController.uploadAvatar);
router.put('/avatar', AuthMiddleware.userAuthenToken, UserController.updateAvatar);
router.delete('/avatar', AuthMiddleware.userAuthenToken, UserController.deleteAvatar);

module.exports = router;

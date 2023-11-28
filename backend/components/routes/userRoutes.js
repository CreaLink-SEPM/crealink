const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController.js");
const AuthMiddleware = require("../middlewares/authMiddleware.js");

router.post("/register", UserController.registerUser);
router.post("/login", UserController.loginUser);
router.post("/logout", AuthMiddleware.userAuthenToken, UserController.logoutUser);
router.post("/refresh-token", UserController.refreshTokenUser);
router.get("/get-all-user", AuthMiddleware.userAuthenToken, UserController.getAllUser);

module.exports = router;

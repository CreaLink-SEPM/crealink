const express = require('express');
const router = express.Router();
const UserController = require("../controllers/userController.js");
const AuthMiddleware = require("../middlewares/authMiddleware.js");

// Admin routes
router.post('/login', UserController.loginAdmin);
router.post('/register', UserController.registerAdmin);
router.get("/admin-only", AuthMiddleware.userAuthenToken, AuthMiddleware.isAdmin, (req, res) => {
    // Only accessible to admins
    res.json({ status: "success", message: "Admin-only route" });
  });
module.exports = router;


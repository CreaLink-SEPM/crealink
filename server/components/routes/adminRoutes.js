const express = require('express');
const router = express.Router();
const UserController = require("../controllers/userController.js");
const AdminController = require('../controllers/adminController.js')
const AuthMiddleware = require("../middlewares/authMiddleware.js");

// Admin routes
router.post('/login', UserController.loginAdmin);
router.post('/register', UserController.registerAdmin);
router.get("/admin-only", AuthMiddleware.userAuthenToken, AuthMiddleware.isAdmin, (req, res) => {
    // Only accessible to admins
    res.json({ status: "success", message: "Admin-only route" });
  });
router.get('/reported-posts', AuthMiddleware.userAuthenToken, AuthMiddleware.isAdmin, AdminController.getReportedPosts);
router.put('/reported-post/:id', AuthMiddleware.userAuthenToken, AuthMiddleware.isAdmin, AdminController.adminDecision);
module.exports = router;


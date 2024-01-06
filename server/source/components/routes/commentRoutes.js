const express = require("express");
const { body } = require("express-validator");
const AuthMiddleware = require("../middlewares/authMiddleware");
const commentController = require("../controllers/commentController");
const router = express.Router();

router.post(
  "/:postId",
  // AuthMiddleware.userAuthenToken,
  [body("commentText").trim().isLength({ min: 1 })],
  commentController.createComment
);
router.get(
  "/:postId",
  // AuthMiddleware.userAuthenToken,
  commentController.getComments
);
router.put(
  "/:commentId",
  // AuthMiddleware.userAuthenToken,
  [body("commentText").trim().isLength({ min: 1 })],
  commentController.editComment
);
router.put(
  "/like/:commentId",
  // AuthMiddleware.userAuthenToken,
  commentController.toggleLike
);
router.delete(
  "/:commentId",
  // AuthMiddleware.userAuthenToken,
  commentController.deleteComment
);
module.exports = router;

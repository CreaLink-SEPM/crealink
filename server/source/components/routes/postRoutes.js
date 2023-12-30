const express = require("express");
const { body } = require("express-validator");
const PostController = require("../controllers/postController");
const AuthMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post(
  "/post",
  AuthMiddleware.userAuthenToken,
  [
    body("title").trim().isLength({ min: 1 }),
    body("content").trim().isLength({ min: 1 }),
  ],
  PostController.createPost
);
router.get("/posts", AuthMiddleware.userAuthenToken, PostController.getPosts);
router.get(
  "/post/:postId",
  AuthMiddleware.userAuthenToken,
  PostController.getPost
);
router.get(
  "/like/:postId",
  AuthMiddleware.userAuthenToken,
  PostController.getLikes
);
router.put(
  "/post/:postId",
  AuthMiddleware.userAuthenToken,
  [
    body("title").trim().isLength({ min: 1 }),
    body("content").trim().isLength({ min: 1 }),
  ],
  PostController.updatePost
);
router.get(
  "/share/:postId",
  AuthMiddleware.userAuthenToken,
  PostController.sharePost
);
router.put(
  "/like/:postId",
  AuthMiddleware.userAuthenToken,
  PostController.toggleLike
);
router.delete(
  "/post/:postId",
  AuthMiddleware.userAuthenToken,
  PostController.deletePost
);
router.post(
  "/report/:postId",
  AuthMiddleware.userAuthenToken,
  PostController.reportPost
);

module.exports = router;
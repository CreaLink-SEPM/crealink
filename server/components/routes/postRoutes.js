const express = require("express");
const { body } = require("express-validator");
const postController = require("../controllers/postController");
const AuthMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post(
  "/post",
  AuthMiddleware.userAuthenToken,
  [
    body("title").trim().isLength({ min: 1 }),
    body("content").trim().isLength({ min: 1 }),
  ],
  postController.createPost
);
router.get("/posts", AuthMiddleware.userAuthenToken, postController.getPosts);
router.get(
  "/post/:postId",
  AuthMiddleware.userAuthenToken,
  postController.getPost
);
router.get(
  "/like/:postId",
  AuthMiddleware.userAuthenToken,
  postController.getLikes
);
router.put(
  "/post/:postId",
  AuthMiddleware.userAuthenToken,
  [
    body("title").trim().isLength({ min: 1 }),
    body("content").trim().isLength({ min: 1 }),
  ],
  postController.updatePost
);
router.get(
  "/share/:postId",
  AuthMiddleware.userAuthenToken,
  postController.sharePost
);
router.put(
  "/like/:postId",
  AuthMiddleware.userAuthenToken,
  postController.toggleLike
);
router.delete(
  "/post/:postId",
  AuthMiddleware.userAuthenToken,
  postController.deletePost
);

module.exports = router;

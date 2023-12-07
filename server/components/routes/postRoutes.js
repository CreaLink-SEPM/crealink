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
router.put(
  "/posts/:postId",
  AuthMiddleware.userAuthenToken,
  [
    body("title").trim().isLength({ min: 1 }),
    body("content").trim().isLength({ min: 1 }),
  ],
  postController.updatePost
);
router.delete(
  "/post/:postId",
  AuthMiddleware.userAuthenToken,
  postController.deletePost
);
module.exports = router;

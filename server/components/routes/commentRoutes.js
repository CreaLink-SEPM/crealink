const express = require('express');
const AuthMiddleware = require('../middlewares/authMiddleware');
const commentController = require('../controllers/commentController');
const router = express.Router();

router.post('/:postId', AuthMiddleware.userAuthenToken, commentController.createComment );
router.get('/:postId', AuthMiddleware.userAuthenToken, commentController.getComments);
module.exports = router;
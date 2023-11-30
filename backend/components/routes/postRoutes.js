const express = require('express');
const {body} = require('express-validator');
const postController = require('../controllers/postController');
const AuthMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();


router.post('/post', AuthMiddleware.userAuthenToken,
 [
    body('title').trim().isLength({min: 1}),
    body('content').trim().isLength({min: 1})
 ], 
 postController.createPost);
 router.get('/posts', AuthMiddleware.userAuthenToken, postController.getPosts);
 module.exports = router;
 



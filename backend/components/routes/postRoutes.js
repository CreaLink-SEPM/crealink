const express = require('express');
const {body} = require('express-validator');
const postController = require('../controllers/postController');
const AuthMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

//GET /feed/post
router.post('/post', AuthMiddleware.userAuthenToken,
 [
    body('title').trim().isLength({min: 1}),
    body('content').trim().isLength({min: 1})
 ], 
 postController.createPost);
 



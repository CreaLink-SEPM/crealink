const express = require('express');
const {body} = require('express-validator');
const postController = require('../controllers/postController');
const AuthMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

//GET /feed/post



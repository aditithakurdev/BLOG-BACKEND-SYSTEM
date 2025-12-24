const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.post('/blogs/:id/comments', authMiddleware, commentController.addComment);
router.get('/blogs/:id/comments', commentController.getCommentsByBlog);

module.exports = router;

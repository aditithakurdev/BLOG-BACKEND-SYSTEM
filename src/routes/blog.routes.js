const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blog.controller');
const authMiddleware = require('../middleware/auth.middleware');
const roleMiddleware = require('../middleware/role.middleware');
const ROLES = require('../libs/roles');

// Anyone authenticated can create a blog
router.post('/', authMiddleware, roleMiddleware(ROLES.AUTHOR, ROLES.ADMIN), blogController.createBlog);

// Get all blogs (no auth required)
router.get('/', blogController.getAllBlogs);
router.get('/:id', blogController.getBlogById);

// Update blog (author or admin)
router.put('/:id', authMiddleware, roleMiddleware(ROLES.AUTHOR, ROLES.ADMIN), blogController.updateBlog);

// Delete blog (author or admin)
router.delete('/:id', authMiddleware, roleMiddleware(ROLES.AUTHOR, ROLES.ADMIN), blogController.deleteBlog);

module.exports = router;
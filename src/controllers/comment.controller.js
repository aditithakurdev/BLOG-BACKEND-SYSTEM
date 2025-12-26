const Comment = require('../models/comments');
const User = require('../models/user');
const Blog = require('../models/blog');

// ADD COMMENT
exports.addComment = async (req, res) => {
  try {
    const { content } = req.body;
    const blogId = req.params.id;

    if (!content) {
      return res.status(400).json({ message: 'Comment content is required' });
    }

    const blog = await Blog.findByPk(blogId);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    const comment = await Comment.create({
      content,
      blogId,
      userId: req.user.id
    });

    res.status(201).json({
      message: 'Comment added successfully',
      comment
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add comment', error });
  }
};

// GET COMMENTS FOR A BLOG
exports.getCommentsByBlog = async (req, res) => {
  try {
    const blogId = req.params.id;

    const comments = await Comment.findAll({
      where: { blogId },
      include: {
        model: User,
        attributes: ['id', 'name', 'email']
      }
    });

    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch comments', error });
  }
};

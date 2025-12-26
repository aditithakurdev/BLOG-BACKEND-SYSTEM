const Comment = require('../models/comments'); 
const User = require('../models/user');
const Blog = require('../models/blog');
const messages = require('../libs/statusMessages');

// ADD COMMENT
exports.addComment = async (req, res) => {
  try {
    const { content } = req.body;
    const blogId = req.params.id;

    if (!content) {
      return res.status(400).json({ message: messages.MISSING_FIELDS });
    }

    const blog = await Blog.findByPk(blogId);
    if (!blog) {
      return res.status(404).json({ message: messages.BLOG_NOT_FOUND });
    }

    const comment = await Comment.create({
      content,
      blogId,
      userId: req.user.id
    });

    return res.status(201).json({
      message: messages.COMMENT_ADDED,
      comment
    });
  } catch (error) {
    return res.status(500).json({ message: messages.COMMENT_ADD_FAILED, error });
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

    return res.json(comments);
  } catch (error) {
    return res.status(500).json({ message: messages.COMMENTS_FETCH_FAILED, error });
  }
};

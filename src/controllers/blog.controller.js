const Blog = require('../models/blog'); 
const User = require('../models/user');
const messages = require('../libs/statusMessages');

// CREATE BLOG
exports.createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: messages.MISSING_FIELDS });
    }

    const blog = await Blog.create({
      title,
      content,
      userId: req.user.id
    });

    return res.status(201).json({
      message: messages.BLOG_CREATED,
      blog
    });
  } catch (error) {
    return res.status(500).json({ message: messages.BLOG_CREATION_FAILED, error });
  }
};

// GET ALL BLOGS
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.findAll({
      include: {
        model: User,
        attributes: ['id', 'name', 'email']
      }
    });

    return res.json(blogs);
  } catch (error) {
    return res.status(500).json({ message: messages.BLOG_FETCH_FAILED, error });
  }
};

// GET BLOG BY ID
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id, {
      include: {
        model: User,
        attributes: ['id', 'name', 'email']
      }
    });

    if (!blog) {
      return res.status(404).json({ message: messages.BLOG_NOT_FOUND });
    }

    return res.json(blog);
  } catch (error) {
    return res.status(500).json({ message: messages.BLOG_FETCH_FAILED, error });
  }
};

// UPDATE BLOG (Author only)
exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: messages.BLOG_NOT_FOUND });
    }

    if (blog.userId !== req.user.id) {
      return res.status(403).json({ message: messages.UNAUTHORIZED });
    }

    const { title, content } = req.body;
    blog.title = title || blog.title;
    blog.content = content || blog.content;
    await blog.save();

    return res.json({ message: messages.BLOG_UPDATED, blog });
  } catch (error) {
    return res.status(500).json({ message: messages.BLOG_UPDATE_FAILED, error });
  }
};

// DELETE BLOG (Author only)
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: messages.BLOG_NOT_FOUND });
    }

    if (blog.userId !== req.user.id) {
      return res.status(403).json({ message: messages.UNAUTHORIZED });
    }

    await blog.destroy();
    return res.json({ message: messages.BLOG_DELETED });
  } catch (error) {
    return res.status(500).json({ message: messages.BLOG_DELETE_FAILED, error });
  }
};

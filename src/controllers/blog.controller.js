const Blog = require('../models/blog');
const User = require('../models/user');

// CREATE BLOG
exports.createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }

    const blog = await Blog.create({
      title,
      content,
      userId: req.user.id
    });

    res.status(201).json({
      message: 'Blog created successfully',
      blog
    });
  } catch (error) {
    res.status(500).json({ message: 'Blog creation failed', error });
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

    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch blogs', error });
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
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch blog', error });
  }
};

// UPDATE BLOG (Author only)
exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    if (blog.userId !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const { title, content } = req.body;

    blog.title = title || blog.title;
    blog.content = content || blog.content;
    await blog.save();

    res.json({ message: 'Blog updated successfully', blog });
  } catch (error) {
    res.status(500).json({ message: 'Update failed', error });
  }
};

// DELETE BLOG (Author only)
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    if (blog.userId !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await blog.destroy();
    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Delete failed', error });
  }
};

const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth.routes');
const blogRoutes = require('./routes/blog.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);


app.get('/', (req, res) => {
  res.send('Blog API is running');
});

module.exports = app;

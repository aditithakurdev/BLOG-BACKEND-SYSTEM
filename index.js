require('dotenv').config();
const app = require('./src/app');
const sequelize = require('./src/config/database');

// Import models
require('./src/models/user');
require('./src/models/blog');
require('./src/models/comments');

const PORT = process.env.PORT;

sequelize.authenticate()
  .then(() => console.log('PostgreSQL connected'))
  .catch(err => console.error('Connection failed:', err));
 
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database synced');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => console.error('DB error:', err));

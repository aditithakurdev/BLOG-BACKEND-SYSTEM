# BLOG-BACKEND-SYSTEM

*COMPANY*: CODETECH IT SOLUTIONS

*NAME*: ADITI

*INTERN ID: CTISO800

*DOMAIN*: BACKEND WEB DEVELOPEMENT

*DURATION*: 4 WEEKS

*MENTOR*: NEELA SANTOSH

*DESCRIPTION*: This project focuses on building a Blog Backend System using Node.js (Express.js). The application provides RESTful APIs for user registration and login, blog post management, and commenting features. Authentication ensures that only authorized users can create, edit, or delete blog content. The backend is integrated with a relational database such as MySQL or PostgreSQL, making it a complete and functional server-side application.

*Tech Stack* 
    - Node.js
    - Express.js
    - Database: PostgreSQL
    - Authentication: JWT

*Project Structure*
blog-backend/
│── src/
│   ├── config/
│   │   └── database.js
│   ├── models/
│   │   ├── user.js
│   │   ├── blog.js
│   │   └── comment.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── blog.routes.js
│   │   └── comment.routes.js
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── blog.controller.js
│   │   └── comment.controller.js
│   ├── middleware/
│   │   └── auth.middleware.js
│   ├── app.js
│── server.js
│── package.json
│── .env

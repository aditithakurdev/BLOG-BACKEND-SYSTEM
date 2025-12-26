const messages = require('../libs/statusMessages');

/**
 * Role-based access control middleware
 * @param  {...string} allowedRoles - list of roles allowed (admin, author, user)
 */
module.exports = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: messages.UNAUTHORIZED });

    // Check if user role is allowed
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden: insufficient role' });
    }

    next();
  };
};

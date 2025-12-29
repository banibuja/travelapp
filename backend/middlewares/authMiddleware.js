const jwt = require('jsonwebtoken');

const isAuthenticated = (req, res, next) => {
  // Check if user is authenticated via passport session
  if (req.isAuthenticated && req.isAuthenticated() && req.user) {
    return next();
  }

  // Fallback: Check for Bearer token in header
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET || "supersecret", (err, user) => {
      if (err) {
        return res.status(403).json({ error: "Invalid token." });
      }
      req.user = user;
      console.log('Authenticated user via JWT:', user);
      return next();
    });
  } else {
    return res.status(401).json({ error: "Authentication required." });
  }
};

function restrictUserRole(req, res, next) {
  const userRole = req.user?.role; // req.user is set by isAuthenticated
  if (userRole === 'user') {
    return res.status(403).json({ message: "Access denied. Insufficient permissions." });
  }
  next();
}

module.exports = { isAuthenticated, restrictUserRole };

const jwt = require('jsonwebtoken');

const isAuthenticated = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Authentication required." });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET || "supersecret", (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token." });
    }
    req.user = user;
    console.log('Authenticated user:', user);
    next();
  });
};

function restrictUserRole(req, res, next) {
  const userRole = req.user?.role; // req.user is set by isAuthenticated
  if (userRole === 'user') {
    return res.status(403).json({ message: "Access denied. Insufficient permissions." });
  }
  next();
}

module.exports = { isAuthenticated, restrictUserRole };

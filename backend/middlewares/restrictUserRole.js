function restrictUserRole(req, res, next) {
    const userRole = req.user?.role; // Assume `req.user` contains the user's info
    if (userRole === 'user') {
        return res.status(403).json({ message: "Access denied. Insufficient permissions." });
    }
    next();
}

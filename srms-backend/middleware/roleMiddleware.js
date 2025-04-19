function allowRoles(...allowedRoles) {
  return (req, res, next) => {
    const userRole = req.role;  // Ensure using req.role, not req.user.role

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ message: 'Access denied. Role not permitted.' });
    }
    next();
  };
}

module.exports = allowRoles;

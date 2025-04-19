// utils/auth.js

const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader) return res.status(401).json({ message: 'Token required' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token format invalid' });

  jwt.verify(token, 'yourSecretKey', (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });

    req.userId = decoded.id;
    req.role = decoded.role;
    next();
  });
}

module.exports = verifyToken;

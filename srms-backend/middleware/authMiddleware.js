const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_jwt_secret';

function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(403).json({ message: 'Token not provided.' });

  const token = authHeader.split(' ')[1];

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Invalid or expired token.' });

    console.log('Decoded token:', decoded);  // Debugging: Check the decoded token structure

    req.userId = decoded.id;
    req.role = decoded.role;
    next();
  });
}

module.exports = verifyToken;

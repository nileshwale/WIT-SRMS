const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db/database');

const JWT_SECRET = 'your_jwt_secret'; // In production, use dotenv for env vars

exports.registerUser = (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) return res.status(400).json({ message: "Missing fields." });

  const hashedPassword = bcrypt.hashSync(password, 8);

  db.run(
    'INSERT INTO users (email, password, role) VALUES (?, ?, ?)',
    [email, hashedPassword, role],
    function (err) {
      if (err) return res.status(500).json({ message: 'User already exists or DB error.' });
      return res.status(201).json({ message: 'User registered successfully!' });
    }
  );
};

exports.loginUser = (req, res) => {
  const { email, password } = req.body;
  db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
    if (err || !user) return res.status(401).json({ message: 'Invalid email or password.' });

    const isValid = bcrypt.compareSync(password, user.password);
    if (!isValid) return res.status(401).json({ message: 'Invalid password.' });

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

    return res.status(200).json({
      message: 'Login successful!',
      token,
      role: user.role,
      email: user.email
    });
  });
};

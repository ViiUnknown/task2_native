const jwt = require('jsonwebtoken');

const JWT_SECRET = 'school_secret_key_123';

const verifyStudent = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (decoded.role !== 'student') {
      return res.status(403).json({ message: 'Access forbidden. Students only.' });
    }

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token.' });
  }
};

module.exports = verifyStudent;

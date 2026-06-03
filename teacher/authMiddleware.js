const jwt = require('jsonwebtoken');


const JWT_SECRET = 'school_secret_key_123';
const verifyTeacher = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (decoded.role !== 'teacher') {
      return res.status(403).json({ message: 'Access forbidden. Teachers only.' });
    }

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token.' });
  }
};

module.exports = verifyTeacher;

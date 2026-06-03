const express = require('express');
const app = express();
const httpProxy = require('http-proxy');
const proxy = httpProxy.createProxyServer();
const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'school_secret_key_123';

const REGISTRATION_SERVICE  = 'http://localhost:3001';
const AUTH_SERVICE          = 'http://localhost:3002';
const STUDENT_SERVICE       = 'http://localhost:3003';
const TEACHER_SERVICE       = 'http://localhost:3004';

function authToken(req, res, next) {
  const header = req?.headers.authorization;
  const token = header && header.split(' ')[1];
  if (token == null) return res.status(401).json({ message: 'Please send token' });
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
}
function authRole(role) {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    next();
  };
}

app.use('/register', (req, res) => {
  console.log('API Gateway → Registration Service');
  proxy.web(req, res, { target: REGISTRATION_SERVICE });
});

app.use('/auth', (req, res) => {
  console.log('API Gateway → Auth Service');
  proxy.web(req, res, { target: AUTH_SERVICE });
});

app.use('/student', authToken, authRole('student'), (req, res) => {
  console.log('API Gateway → Student Service');
  proxy.web(req, res, { target: STUDENT_SERVICE });
});

app.use('/teacher', authToken, authRole('teacher'), (req, res) => {
  console.log('API Gateway → Teacher Service');
  proxy.web(req, res, { target: TEACHER_SERVICE });
});
const PORT = 3000;
app.listen(PORT, () => console.log(`API Gateway running on port ${PORT}`));

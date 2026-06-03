const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const connectDB = require('./dbconnect');
const User = require('./User');

const app = express();
app.use(express.json());

connectDB();

const JWT_SECRET = 'school_secret_key_123';

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.json({
      message: 'Login successful',
      role: user.role,
      token,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const port = 3002;
app.listen(port, () => console.log(`Authentication Service running on port ${port}`));
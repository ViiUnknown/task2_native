const express = require('express');
const connectDB = require('./dbconnect');
const User = require('./models/User');

const app = express();
app.use(express.json());
connectDB();

app.get('/', async (req, res) => {
  const students = await User.find({ role: 'student' }).select('-password');
  res.json({ message: 'Student data retrieved successfully', students });
});

app.get('/profile', async (req, res) => {
  const id = req.headers['x-user-id'];
  const student = await User.findById(id).select('-password');
  res.json({ message: 'Student profile', profile: student });
});

app.listen(3003, () => console.log('Student Service running on port 3003'));

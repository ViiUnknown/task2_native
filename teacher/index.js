const express = require('express');
const connectDB = require('./dbconnect');
const User = require('./models/User');

const app = express();
app.use(express.json());
connectDB();

app.get('/', async (req, res) => {
  const teachers = await User.find({ role: 'teacher' }).select('-password');
  res.json({ message: 'Teacher data retrieved successfully', teachers });
});

app.get('/profile', async (req, res) => {
  const id = req.headers['x-user-id'];
  const teacher = await User.findById(id).select('-password');
  res.json({ message: 'Teacher profile', profile: teacher });
});

app.listen(3004, () => console.log('Teacher Service running on port 3004'));

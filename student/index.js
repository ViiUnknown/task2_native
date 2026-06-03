const express = require('express');
const connectDB = require('./dbconnect');
const User = require('./User');
const verifyStudent = require('./authMiddleware');

const app = express();
app.use(express.json());

connectDB();
app.get('/students', verifyStudent, async (req, res) => {
  const students = await User.find({ role: 'student' }).select('-password');
  res.json({
    message: 'Student data retrieved successfully',
    requestedBy: req.user.email,
    students,
  });
});

app.get('/students/profile', verifyStudent, async (req, res) => {
  const student = await User.findById(req.user.id).select('-password');
  res.json({ message: 'Student profile', profile: student });
});

const PORT = 3003;
app.listen(PORT, () => console.log(`Student Service running on port ${PORT}`));

const express = require('express');
const connectDB = require('./dbconnect');
const User = require('./User');
const verifyTeacher = require('./authMiddleware');

const app = express();
app.use(express.json());

connectDB();
app.get('/teachers', verifyTeacher, async (req, res) => {
  const teachers = await User.find({ role: 'teacher' }).select('-password');
  res.json({
    message: 'Teacher data retrieved successfully',
    requestedBy: req.user.email,
    teachers,
  });
});

app.get('/teachers/profile', verifyTeacher, async (req, res) => {
  const teacher = await User.findById(req.user.id).select('-password');
  res.json({ message: 'Teacher profile', profile: teacher });
});

const PORT = 3004;
app.listen(PORT, () => console.log(`Teacher Service running on port ${PORT}`));

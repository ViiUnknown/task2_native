const express = require('express');
const bcrypt = require('bcryptjs');
const connectDB = require('./dbconnect');
const User = require('./User');

const app = express();
app.use(express.json());

connectDB();

app.post('/register/student', async (req, res) => {
  try {
    const { name, email, password, studentId, grade, major } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const student = await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'student',
      studentId,
      grade,
      major,
    });

    res.status(201).json({
      message: 'Student registered successfully',
      user: {
        id: student._id,
        name: student.name,
        email: student.email,
        role: student.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/register/teacher', async (req, res) => {
  try {
    const { name, email, password, teacherId, department, subject } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const teacher = await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'teacher',
      teacherId,
      department,
      subject,
    });

    res.status(201).json({
      message: 'Teacher registered successfully',
      user: {
        id: teacher._id,
        name: teacher.name,
        email: teacher.email,
        role: teacher.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Registration Service running on port ${PORT}`));

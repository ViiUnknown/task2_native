const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['student', 'teacher'], required: true },

    // Student-specific fields
    studentId: String,
    grade: String,
    major: String,

    // Teacher-specific fields
    teacherId: String,
    department: String,
    subject: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);

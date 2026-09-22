const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const authRoutes = require('./routes/authRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const overtimeRoutes = require('./routes/overtimeRoutes');
const userRoutes = require('./routes/userRoutes');
const reportRoutes = require('./routes/reportRoutes');

const app = express();

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://attendance-management-system-puce-chi.vercel.app'
  ],
  credentials: true
}));
app.use(express.json());
app.use(morgan("dev"));

// Test route
app.get("/", (req,res) =>{
    res.json({
         success: true,
         message:"Attendance Management System"
    });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/overtime', overtimeRoutes);
app.use('/api/users', userRoutes);
app.use('/api/report', reportRoutes);

module.exports= app;
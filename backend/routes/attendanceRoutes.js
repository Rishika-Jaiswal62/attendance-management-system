const express = require('express');
const router = express.Router();

const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');
const punchIn = require('../controllers/attendance/punchInController');
const punchOut = require('../controllers/attendance/punchOutController');
const {
  getMyAttendance,
  getTeamAttendance,
  getAllAttendance
} = require('../controllers/attendance/getAttendanceController');
const validateAttendance = require('../controllers/attendance/validate.controller');

router.post('/punch-in', protect, punchIn);
router.put('/punch-out', protect, punchOut);

// Dashboards
router.get('/my', protect, getMyAttendance);
router.get('/team', protect, authorizeRoles('manager', 'admin'), getTeamAttendance);
router.get('/all', protect, authorizeRoles('admin'), getAllAttendance);


module.exports = router;
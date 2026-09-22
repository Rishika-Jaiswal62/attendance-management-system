const express = require('express');
const router = express.Router();

const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');
const requestOvertime = require('../controllers/overtime/rOvertimeController');
const updateOvertimeStatus = require('../controllers/overtime/uOvertimeController');

// Employee requests overtime
router.post('/request/:attendanceId', protect, requestOvertime);

// Manager/Admin approves or rejects
router.put('/update/:attendanceId', protect, authorizeRoles('admin', 'manager'), updateOvertimeStatus);

module.exports = router;
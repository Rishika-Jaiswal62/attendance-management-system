const Attendance = require('../../models/Attendance');

// @desc    Employee requests overtime for their attendance record
// @route   POST /api/overtime/request/:attendanceId
// @access  Private (Employee)
const requestOvertime = async (req, res) => {
  try {
    const { attendanceId } = req.params;

    const attendance = await Attendance.findById(attendanceId);

    if (!attendance) {
      return res.status(404).json({ message: 'Attendance record not found' });
    }

    // Employee sirf apna hi record pe request kar sake
    if (attendance.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized for this attendance record' });
    }

    if (attendance.overtimeRequested) {
      return res.status(400).json({ message: 'Overtime already requested for this record' });
    }

    attendance.overtimeRequested = true;
    attendance.overtimeStatus = 'Pending';

    await attendance.save();

    return res.status(200).json(attendance);
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = requestOvertime;
const Attendance = require('../../models/Attendance');

// @desc    Admin/Manager marks attendance as Valid or Invalid
// @route   PUT /api/attendance/validate/:attendanceId
// @access  Private (Admin, Manager)
const validateAttendance = async (req, res) => {
  try {
    const { attendanceId } = req.params;
    const { validation, remarks } = req.body;

    if (!['Valid', 'Invalid'].includes(validation)) {
      return res.status(400).json({ message: 'Validation must be Valid or Invalid' });
    }

    const attendance = await Attendance.findById(attendanceId);

    if (!attendance) {
      return res.status(404).json({ message: 'Attendance record not found' });
    }

    // Invalid mark karte waqt remarks dena mandatory rakhte hain (accountability ke liye)
    if (validation === 'Invalid' && !remarks) {
      return res.status(400).json({ message: 'Remarks are required when marking attendance as Invalid' });
    }

    attendance.validation = validation;
    attendance.remarks = remarks || attendance.remarks;

    await attendance.save();

    return res.status(200).json(attendance);
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = validateAttendance;
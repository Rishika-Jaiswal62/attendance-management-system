const Attendance = require('../../models/Attendance');

// @desc    Manager/Admin approves or rejects overtime request
// @route   PUT /api/overtime/update/:attendanceId
// @access  Private (Manager, Admin)
const updateOvertimeStatus = async (req, res) => {
  try {
    const { attendanceId } = req.params;
    const { status } = req.body; // 'Approved' or 'Rejected'

    if (!['Approved', 'Rejected'].includes(status)) {
      return res.status(400).json({ message: 'Status must be Approved or Rejected' });
    }

    const attendance = await Attendance.findById(attendanceId);

    if (!attendance) {
      return res.status(404).json({ message: 'Attendance record not found' });
    }

    if (!attendance.overtimeRequested) {
      return res.status(400).json({ message: 'No overtime request found for this record' });
    }

    if (attendance.overtimeStatus !== 'Pending') {
      return res.status(400).json({ message: `Overtime already ${attendance.overtimeStatus}` });
    }

    attendance.overtimeStatus = status;
    await attendance.save();

    return res.status(200).json(attendance);
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = updateOvertimeStatus;
const Attendance = require('../../models/Attendance');

// @desc    Employee punch out
// @route   PUT /api/attendance/punch-out
// @access  Private (Employee)
const punchOut = async (req, res) => {
  try {
    const { latitude, longitude, selfie } = req.body;

    if (!latitude || !longitude || !selfie) {
      return res.status(400).json({ message: 'Location and selfie are required' });
    }

    const attendance = await Attendance.findOne({
      user: req.user._id,
      punchOutTime: null
    });

    if (!attendance) {
      return res.status(400).json({ message: 'No active punch-in found' });
    }

    attendance.punchOutTime = new Date();
    attendance.punchOutSelfie = selfie;
    attendance.punchOutLocation = { latitude, longitude };

    // Calculate working hours
    const diffMs = attendance.punchOutTime - attendance.punchInTime;
    const hours = diffMs / (1000 * 60 * 60);

    attendance.totalWorkingHours = Number(hours.toFixed(2));
    attendance.status = hours >= 8 ? 'Completed' : 'Incomplete';

    await attendance.save();

    return res.status(200).json(attendance);
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = punchOut;
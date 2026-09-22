const Attendance = require('../../models/Attendance');

// @desc    Employee punch in
// @route   POST /api/attendance/punch-in
// @access  Private (Employee)
const punchIn = async (req, res) => {
  try {
    const { latitude, longitude, selfie } = req.body;

    if (!latitude || !longitude || !selfie) {
      return res.status(400).json({ message: 'Location and selfie are required' });
    }

    // Check if user already punched in today without punching out
    const existing = await Attendance.findOne({
      user: req.user._id,
      punchOutTime: null
    });

    if (existing) {
      return res.status(400).json({ message: 'Already punched in. Please punch out first.' });
    }

    const attendance = await Attendance.create({
      user: req.user._id,
      punchInTime: new Date(),
      punchInSelfie: selfie,
      punchInLocation: { latitude, longitude }
    });

    return res.status(201).json(attendance);
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = punchIn;
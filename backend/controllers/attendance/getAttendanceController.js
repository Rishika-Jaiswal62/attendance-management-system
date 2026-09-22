const Attendance = require('../../models/Attendance');
const User = require('../../models/User');

const getMyAttendance = async (req, res) => {
  try {
    const records = await Attendance.find({ user: req.user._id }).sort({ createdAt: -1 });
    return res.status(200).json(records);
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getTeamAttendance = async (req, res) => {
  try {
    const employees = await User.find({ role: 'employee' }).select('_id');
    const employeeIds = employees.map((emp) => emp._id);

    const records = await Attendance.find({ user: { $in: employeeIds } })
      .populate('user', 'name email role')
      .sort({ createdAt: -1 });

    return res.status(200).json(records);
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getAllAttendance = async (req, res) => {
  try {
    const records = await Attendance.find({})
      .populate('user', 'name email role')
      .sort({ createdAt: -1 });

    return res.status(200).json(records);
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getMyAttendance, getTeamAttendance, getAllAttendance };
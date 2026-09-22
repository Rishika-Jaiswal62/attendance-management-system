const Attendance = require('../../models/Attendance');
const User = require('../../models/User');

// @desc    Generate attendance report (role-based + optional date filter)
// @route   GET /api/report?date=2025-01-15
// @access  Private (Employee, Manager, Admin)
const getReport = async (req, res) => {
  try {
    const { date } = req.query;

    // Base filter — role ke hisaab se decide karo kiska data dikhana hai
    let userFilter = {};

    if (req.user.role === 'employee') {
      userFilter = { user: req.user._id };
    } else if (req.user.role === 'manager') {
      const employees = await User.find({ role: 'employee' }).select('_id');
      userFilter = { user: { $in: employees.map((e) => e._id) } };
    }
    // admin ke liye userFilter khali rahega — matlab sabka data

    // Date filter (agar diya ho)
    let dateFilter = {};
    if (date) {
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);

      dateFilter = { createdAt: { $gte: startOfDay, $lte: endOfDay } };
    }

    const records = await Attendance.find({ ...userFilter, ...dateFilter })
      .populate('user', 'name email role')
      .sort({ createdAt: -1 });

    // Clean report shape banao — sirf required fields
    const report = records.map((r) => ({
      name: r.user?.name,
      email: r.user?.email,
      punchInTime: r.punchInTime,
      punchOutTime: r.punchOutTime,
      punchInSelfie: r.punchInSelfie,
      punchOutSelfie: r.punchOutSelfie,
      punchInLocation: r.punchInLocation,
      punchOutLocation: r.punchOutLocation,
      totalWorkingHours: r.totalWorkingHours,
      status: r.status,
      validation: r.validation
    }));

    return res.status(200).json({ count: report.length, report });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = getReport;
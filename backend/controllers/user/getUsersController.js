const User = require('../../models/User');

// @desc    Admin views all users
// @route   GET /api/users
// @access  Private (Admin)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password').sort({ createdAt: -1 });
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getAllUsers };
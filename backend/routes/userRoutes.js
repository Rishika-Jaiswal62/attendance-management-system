const express = require('express');
const router = express.Router();

const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');
const { getAllUsers } = require('../controllers/user/getUsersController');

router.get('/', protect, authorizeRoles('admin'), getAllUsers);

module.exports = router;
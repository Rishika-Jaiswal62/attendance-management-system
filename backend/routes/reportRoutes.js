const express = require('express');
const router = express.Router();

const { protect } = require('../middleware/authMiddleware');
const getReport = require('../controllers/report/getReport.controller');

router.get('/', protect, getReport);

module.exports = router;
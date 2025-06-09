// Optivana API - System Alert Routes
const express = require('express');
const router = express.Router();
const alertController = require('../controllers/alertController');
const auth = require('../middleware/auth');

/**
 * @route   GET /api/system/alerts
 * @desc    Get AI notifications, risks, tips
 * @access  Private
 */
router.get('/alerts', auth, alertController.getAlerts);

/**
 * @route   PUT /api/system/alerts/:alertId
 * @desc    Mark alert as read
 * @access  Private
 */
router.put('/alerts/:alertId', auth, alertController.markAlertAsRead);

module.exports = router;

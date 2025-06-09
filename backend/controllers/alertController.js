// Optivana API - Alert Controller
const { VanthexCore } = require('../services/vanthexCore');

/**
 * Get AI notifications, risks, tips
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getAlerts = async (req, res) => {
  try {
    const { userId } = req.user;
    const { storeId, type, limit = 20 } = req.query;
    
    // Get alerts using VANTHEX Core
    const vanthex = new VanthexCore();
    const alerts = await vanthex.getSystemAlerts({ 
      userId,
      storeId,
      type,
      limit: parseInt(limit)
    });
    
    res.json(alerts);
  } catch (err) {
    console.error('Error in getAlerts:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

/**
 * Mark alert as read
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.markAlertAsRead = async (req, res) => {
  try {
    const { alertId } = req.params;
    const { userId } = req.user;
    
    // Mark alert as read using VANTHEX Core
    const vanthex = new VanthexCore();
    const result = await vanthex.markAlertAsRead(alertId, userId);
    
    res.json(result);
  } catch (err) {
    console.error('Error in markAlertAsRead:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

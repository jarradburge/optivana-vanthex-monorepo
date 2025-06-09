// Optivana API - Campaign Controller
const Campaign = require('../models/Campaign');
const { VanthexCore } = require('../services/vanthexCore');

/**
 * Launch new campaign
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.launchCampaign = async (req, res) => {
  try {
    const { storeId, productId, platform, budget, variants } = req.body;
    
    // Validate required fields
    if (!storeId || !productId || !platform || !budget) {
      return res.status(400).json({ message: 'Store ID, Product ID, platform, and budget are required' });
    }
    
    // Launch campaign using VANTHEX Core
    const vanthex = new VanthexCore();
    const campaign = await vanthex.launchCampaign({
      storeId,
      productId,
      platform,
      budget,
      variants: variants || []
    });
    
    res.status(201).json(campaign);
  } catch (err) {
    console.error('Error in launchCampaign:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

/**
 * Get campaign details
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getCampaign = async (req, res) => {
  try {
    const { campaignId } = req.params;
    
    // In a real implementation, this would fetch from database
    const campaign = await Campaign.findById(campaignId);
    
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }
    
    res.json(campaign);
  } catch (err) {
    console.error('Error in getCampaign:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

/**
 * Update campaign budget
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.updateCampaignBudget = async (req, res) => {
  try {
    const { campaignId } = req.params;
    const { budget } = req.body;
    
    // Validate required fields
    if (!budget || typeof budget !== 'number' || budget <= 0) {
      return res.status(400).json({ message: 'Valid budget is required' });
    }
    
    // Update campaign budget using VANTHEX Core
    const vanthex = new VanthexCore();
    const updatedCampaign = await vanthex.updateCampaignBudget(campaignId, budget);
    
    res.json(updatedCampaign);
  } catch (err) {
    console.error('Error in updateCampaignBudget:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

/**
 * Get campaign performance
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getCampaignPerformance = async (req, res) => {
  try {
    const { campaignId } = req.params;
    
    // Get campaign performance using VANTHEX Core
    const vanthex = new VanthexCore();
    const performance = await vanthex.getCampaignPerformance(campaignId);
    
    res.json(performance);
  } catch (err) {
    console.error('Error in getCampaignPerformance:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

/**
 * Create A/B test variants
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.createVariants = async (req, res) => {
  try {
    const { campaignId } = req.params;
    const { count = 3 } = req.body;
    
    // Create variants using VANTHEX Core
    const vanthex = new VanthexCore();
    const variants = await vanthex.createCampaignVariants(campaignId, count);
    
    res.json({ variants });
  } catch (err) {
    console.error('Error in createVariants:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

/**
 * Scale campaign operations
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.scaleCampaign = async (req, res) => {
  try {
    const { campaignId } = req.params;
    const { variantIds, action, budgetIncrease } = req.body;
    
    // Validate required fields
    if (!variantIds || !Array.isArray(variantIds) || variantIds.length === 0) {
      return res.status(400).json({ message: 'Variant IDs array is required' });
    }
    
    if (!action || !['scale', 'pause', 'stop'].includes(action)) {
      return res.status(400).json({ message: 'Valid action is required (scale, pause, or stop)' });
    }
    
    // Scale campaign using VANTHEX Core
    const vanthex = new VanthexCore();
    const result = await vanthex.scaleCampaign(campaignId, {
      variantIds,
      action,
      budgetIncrease: budgetIncrease || 0
    });
    
    res.json(result);
  } catch (err) {
    console.error('Error in scaleCampaign:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

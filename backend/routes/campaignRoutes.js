// Optivana API - Campaign Routes
const express = require('express');
const router = express.Router();
const campaignController = require('../controllers/campaignController');
const auth = require('../middleware/auth');

/**
 * @route   POST /api/campaigns/launch
 * @desc    Launch new campaign
 * @access  Private
 */
router.post('/launch', auth, campaignController.launchCampaign);

/**
 * @route   GET /api/campaigns/:campaignId
 * @desc    Get campaign details
 * @access  Private
 */
router.get('/:campaignId', auth, campaignController.getCampaign);

/**
 * @route   PUT /api/campaigns/:campaignId/budget
 * @desc    Update campaign budget
 * @access  Private
 */
router.put('/:campaignId/budget', auth, campaignController.updateCampaignBudget);

/**
 * @route   GET /api/campaigns/:campaignId/performance
 * @desc    Get campaign performance
 * @access  Private
 */
router.get('/:campaignId/performance', auth, campaignController.getCampaignPerformance);

/**
 * @route   POST /api/campaigns/:campaignId/variants
 * @desc    Create A/B test variants
 * @access  Private
 */
router.post('/:campaignId/variants', auth, campaignController.createVariants);

/**
 * @route   PUT /api/campaigns/:campaignId/scale
 * @desc    Scale campaign operations
 * @access  Private
 */
router.put('/:campaignId/scale', auth, campaignController.scaleCampaign);

module.exports = router;

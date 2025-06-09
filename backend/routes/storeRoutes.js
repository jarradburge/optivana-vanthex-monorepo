// Optivana API - Store Routes
const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');
const auth = require('../middleware/auth');

/**
 * @route   GET /api/store/:storeId
 * @desc    Get store details
 * @access  Private
 */
router.get('/:storeId', auth, storeController.getStore);

/**
 * @route   POST /api/store/initiate
 * @desc    Create new store
 * @access  Private
 */
router.post('/initiate', auth, storeController.initiateStore);

/**
 * @route   PUT /api/store/:storeId
 * @desc    Update store settings
 * @access  Private
 */
router.put('/:storeId', auth, storeController.updateStore);

/**
 * @route   GET /api/store/:storeId/performance
 * @desc    Get store performance metrics
 * @access  Private
 */
router.get('/:storeId/performance', auth, storeController.getStorePerformance);

/**
 * @route   PUT /api/store/:storeId/products
 * @desc    Add products to store
 * @access  Private
 */
router.put('/:storeId/products', auth, storeController.addProductsToStore);

/**
 * @route   DELETE /api/store/:storeId/products/:productId
 * @desc    Remove product from store
 * @access  Private
 */
router.delete('/:storeId/products/:productId', auth, storeController.removeProductFromStore);

/**
 * @route   PUT /api/store/reroute
 * @desc    Auto supplier reroute
 * @access  Private
 */
router.put('/reroute', auth, storeController.reroute);

module.exports = router;

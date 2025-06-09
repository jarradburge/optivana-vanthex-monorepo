// Optivana API - Product Routes
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const auth = require('../middleware/auth');

/**
 * @route   GET /api/products/trending
 * @desc    Get trending products
 * @access  Private
 */
router.get('/trending', auth, productController.getTrendingProducts);

/**
 * @route   GET /api/products/:productId
 * @desc    Get product details
 * @access  Private
 */
router.get('/:productId', auth, productController.getProduct);

/**
 * @route   POST /api/products/analyze
 * @desc    Analyze product emotions and attributes
 * @access  Private
 */
router.post('/analyze', auth, productController.analyzeProduct);

module.exports = router;

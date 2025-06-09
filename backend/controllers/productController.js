// Optivana API - Product Controller
const Product = require('../models/Product');
const { VanthexCore } = require('../services/vanthexCore');

/**
 * Get trending products
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getTrendingProducts = async (req, res) => {
  try {
    const { category, limit = 10 } = req.query;
    
    // Get trending products using VANTHEX Core
    const vanthex = new VanthexCore();
    const products = await vanthex.getTrendingProducts({ 
      category, 
      limit: parseInt(limit) 
    });
    
    res.json(products);
  } catch (err) {
    console.error('Error in getTrendingProducts:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

/**
 * Get product details
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    
    // In a real implementation, this would fetch from database
    const product = await Product.findById(productId);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json(product);
  } catch (err) {
    console.error('Error in getProduct:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

/**
 * Analyze product emotions and attributes
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.analyzeProduct = async (req, res) => {
  try {
    const { productId, productData } = req.body;
    
    // Validate required fields
    if (!productId && !productData) {
      return res.status(400).json({ message: 'Either productId or productData is required' });
    }
    
    // Analyze product using VANTHEX Core
    const vanthex = new VanthexCore();
    const analysis = await vanthex.analyzeProduct(productId, productData);
    
    res.json(analysis);
  } catch (err) {
    console.error('Error in analyzeProduct:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

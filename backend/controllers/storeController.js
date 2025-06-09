// Optivana API - Store Controller
const Store = require('../models/Store');
const Product = require('../models/Product');
const { VanthexCore } = require('../services/vanthexCore');

/**
 * Get store details
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getStore = async (req, res) => {
  try {
    const { storeId } = req.params;
    
    // In a real implementation, this would fetch from database
    const store = await Store.findById(storeId);
    
    if (!store) {
      return res.status(404).json({ message: 'Store not found' });
    }
    
    res.json(store);
  } catch (err) {
    console.error('Error in getStore:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

/**
 * Create new store
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.initiateStore = async (req, res) => {
  try {
    const { name, domain, mode = 'autonomous' } = req.body;
    const userId = req.user.id;
    
    // Validate required fields
    if (!name || !domain) {
      return res.status(400).json({ message: 'Name and domain are required' });
    }
    
    // Check if domain is available
    const domainExists = await Store.findByDomain(domain);
    if (domainExists) {
      return res.status(400).json({ message: 'Domain already in use' });
    }
    
    // Create store using VANTHEX Core
    const vanthex = new VanthexCore();
    const storeData = await vanthex.createStore({
      name,
      domain,
      mode,
      userId
    });
    
    // Save store to database
    const store = await Store.create(storeData);
    
    res.status(201).json(store);
  } catch (err) {
    console.error('Error in initiateStore:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

/**
 * Update store settings
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.updateStore = async (req, res) => {
  try {
    const { storeId } = req.params;
    const updates = req.body;
    
    // In a real implementation, this would update in database
    const store = await Store.findByIdAndUpdate(storeId, updates, { new: true });
    
    if (!store) {
      return res.status(404).json({ message: 'Store not found' });
    }
    
    res.json(store);
  } catch (err) {
    console.error('Error in updateStore:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

/**
 * Get store performance metrics
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getStorePerformance = async (req, res) => {
  try {
    const { storeId } = req.params;
    const { timeframe = '7d' } = req.query;
    
    // Validate store exists
    const store = await Store.findById(storeId);
    if (!store) {
      return res.status(404).json({ message: 'Store not found' });
    }
    
    // Get performance data from VANTHEX Core
    const vanthex = new VanthexCore();
    const performanceData = await vanthex.getStorePerformance(storeId, timeframe);
    
    res.json(performanceData);
  } catch (err) {
    console.error('Error in getStorePerformance:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

/**
 * Add products to store
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.addProductsToStore = async (req, res) => {
  try {
    const { storeId } = req.params;
    const { productIds } = req.body;
    
    // Validate required fields
    if (!productIds || !Array.isArray(productIds)) {
      return res.status(400).json({ message: 'Product IDs array is required' });
    }
    
    // Validate store exists
    const store = await Store.findById(storeId);
    if (!store) {
      return res.status(404).json({ message: 'Store not found' });
    }
    
    // Add products to store using VANTHEX Core
    const vanthex = new VanthexCore();
    const updatedStore = await vanthex.addProductsToStore(storeId, productIds);
    
    res.json(updatedStore);
  } catch (err) {
    console.error('Error in addProductsToStore:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

/**
 * Remove product from store
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.removeProductFromStore = async (req, res) => {
  try {
    const { storeId, productId } = req.params;
    
    // Validate store exists
    const store = await Store.findById(storeId);
    if (!store) {
      return res.status(404).json({ message: 'Store not found' });
    }
    
    // Remove product from store using VANTHEX Core
    const vanthex = new VanthexCore();
    const updatedStore = await vanthex.removeProductFromStore(storeId, productId);
    
    res.json(updatedStore);
  } catch (err) {
    console.error('Error in removeProductFromStore:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

/**
 * Auto supplier reroute
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.reroute = async (req, res) => {
  try {
    const { storeId, productId } = req.body;
    
    // Validate required fields
    if (!storeId || !productId) {
      return res.status(400).json({ message: 'Store ID and Product ID are required' });
    }
    
    // Perform reroute using VANTHEX Core
    const vanthex = new VanthexCore();
    const result = await vanthex.reroute(storeId, productId);
    
    res.json(result);
  } catch (err) {
    console.error('Error in reroute:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

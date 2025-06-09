// Optivana API - Integration with VANTHEX Core
const axios = require('axios');
const logger = require('../utils/logger');

class VanthexCoreService {
  constructor() {
    this.apiUrl = process.env.VANTHEX_API_URL || 'http://localhost:5001/api';
    this.apiKey = process.env.VANTHEX_API_KEY || 'development_key';
    this.client = axios.create({
      baseURL: this.apiUrl,
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': this.apiKey
      }
    });
  }

  /**
   * Discover trending products
   * @param {Object} options - Discovery options
   * @param {String} options.category - Product category
   * @param {Number} options.limit - Maximum number of products to return
   * @param {String} options.source - Source platform (e.g., 'tiktok', 'amazon')
   * @returns {Promise<Array>} - Array of discovered products
   */
  async discoverProducts(options = {}) {
    try {
      const response = await this.client.post('/product-scraper/discover', options);
      return response.data;
    } catch (error) {
      logger.error('Error discovering products:', error);
      throw new Error('Failed to discover products');
    }
  }

  /**
   * Analyze product emotions
   * @param {Object} product - Product data
   * @returns {Promise<Object>} - Emotional analysis results
   */
  async analyzeProductEmotions(product) {
    try {
      const response = await this.client.post('/emotional-targeting/analyze', { product });
      return response.data;
    } catch (error) {
      logger.error('Error analyzing product emotions:', error);
      throw new Error('Failed to analyze product emotions');
    }
  }

  /**
   * Generate ad creatives
   * @param {Object} options - Creative generation options
   * @param {Object} options.product - Product data
   * @param {Array} options.personas - Target personas
   * @param {String} options.platform - Ad platform (e.g., 'facebook', 'tiktok')
   * @param {Number} options.count - Number of creatives to generate
   * @returns {Promise<Array>} - Generated ad creatives
   */
  async generateAdCreatives(options) {
    try {
      const response = await this.client.post('/emotional-targeting/generate-creatives', options);
      return response.data;
    } catch (error) {
      logger.error('Error generating ad creatives:', error);
      throw new Error('Failed to generate ad creatives');
    }
  }

  /**
   * Launch campaign variants
   * @param {Object} campaign - Campaign data
   * @param {Number} numVariants - Number of variants to launch
   * @returns {Promise<Array>} - Launched campaign variants
   */
  async launchCampaignVariants(campaign, numVariants = 3) {
    try {
      const response = await this.client.post('/iteration-engine/launch-variants', {
        campaign,
        numVariants
      });
      return response.data;
    } catch (error) {
      logger.error('Error launching campaign variants:', error);
      throw new Error('Failed to launch campaign variants');
    }
  }

  /**
   * Optimize campaign performance
   * @param {String} campaignId - Campaign ID
   * @returns {Promise<Object>} - Optimization results
   */
  async optimizeCampaign(campaignId) {
    try {
      const response = await this.client.post('/iteration-engine/optimize', { campaignId });
      return response.data;
    } catch (error) {
      logger.error('Error optimizing campaign:', error);
      throw new Error('Failed to optimize campaign');
    }
  }

  /**
   * Scale successful campaigns
   * @param {String} campaignId - Campaign ID
   * @param {Array} variantIds - Variant IDs to scale
   * @param {Object} options - Scaling options
   * @returns {Promise<Object>} - Scaling results
   */
  async scaleCampaign(campaignId, variantIds, options = {}) {
    try {
      const response = await this.client.post('/scaling-logic/scale', {
        campaignId,
        variantIds,
        options
      });
      return response.data;
    } catch (error) {
      logger.error('Error scaling campaign:', error);
      throw new Error('Failed to scale campaign');
    }
  }

  /**
   * Reroute orders to alternative suppliers
   * @param {String} orderId - Order ID
   * @param {Object} options - Rerouting options
   * @returns {Promise<Object>} - Rerouting results
   */
  async rerouteOrder(orderId, options = {}) {
    try {
      const response = await this.client.post('/order-routing/reroute', {
        orderId,
        options
      });
      return response.data;
    } catch (error) {
      logger.error('Error rerouting order:', error);
      throw new Error('Failed to reroute order');
    }
  }

  /**
   * Get system health status
   * @returns {Promise<Object>} - System health status
   */
  async getSystemHealth() {
    try {
      const response = await this.client.get('/system/health');
      return response.data;
    } catch (error) {
      logger.error('Error getting system health:', error);
      throw new Error('Failed to get system health');
    }
  }
}

module.exports = new VanthexCoreService();

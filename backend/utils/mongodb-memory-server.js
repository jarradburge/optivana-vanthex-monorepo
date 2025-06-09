// MongoDB Memory Server Configuration for Development/Testing
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const logger = require('./logger');

let mongoServer;

/**
 * Start MongoDB Memory Server and connect Mongoose
 * @returns {Promise<string>} MongoDB URI
 */
async function startMemoryServer() {
  try {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    logger.info(`MongoDB Memory Server started at ${mongoUri}`);
    return mongoUri;
  } catch (error) {
    logger.error('Failed to start MongoDB Memory Server:', error);
    throw error;
  }
}

/**
 * Connect to MongoDB (either Memory Server or Atlas based on environment)
 * @param {string} atlasUri - MongoDB Atlas URI for production
 * @returns {Promise<void>}
 */
async function connectToDatabase(atlasUri) {
  try {
    // Determine if we should use Memory Server or Atlas
    const isProduction = process.env.NODE_ENV === 'production';
    const mongoUri = isProduction ? atlasUri : await startMemoryServer();
    
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    logger.info(`Connected to MongoDB (${isProduction ? 'Atlas' : 'Memory Server'})`);
  } catch (error) {
    logger.error('MongoDB connection error:', error);
    throw error;
  }
}

/**
 * Stop MongoDB Memory Server
 * @returns {Promise<void>}
 */
async function stopMemoryServer() {
  if (mongoServer) {
    await mongoose.disconnect();
    await mongoServer.stop();
    logger.info('MongoDB Memory Server stopped');
  }
}

module.exports = {
  connectToDatabase,
  stopMemoryServer,
};

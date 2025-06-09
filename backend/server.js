// Optivana API - Main Server Configuration
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');

// Load environment variables first
dotenv.config();

const logger = require('./utils/logger');
const { connectToDatabase } = require('./utils/mongodb-memory-server');

// Import routes
const storeRoutes = require('./routes/storeRoutes');
const productRoutes = require('./routes/productRoutes');
const campaignRoutes = require('./routes/campaignRoutes');
const systemRoutes = require('./routes/systemRoutes');

// Import middleware
const errorHandler = require('./middleware/errorHandler');
const auth = require('./middleware/auth');

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB (either Memory Server or Atlas based on environment)
connectToDatabase(process.env.MONGODB_URI)
  .then(() => logger.info('Database connection established'))
  .catch(err => {
    logger.error('Database connection error:', err);
    process.exit(1);
  });

// Apply middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies
app.use(morgan('dev')); // HTTP request logger

// Rate limiting
const limiter = rateLimit({
  windowMs: process.env.RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000, // 15 minutes
  max: process.env.RATE_LIMIT_MAX || 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// API routes
app.use('/api/stores', auth, storeRoutes);
app.use('/api/products', auth, productRoutes);
app.use('/api/campaigns', auth, campaignRoutes);
app.use('/api/system', auth, systemRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Optivana API is running' });
});

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Optivana API server running on port ${PORT}`);
});

module.exports = app;

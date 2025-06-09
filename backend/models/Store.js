// Optivana API - Store Model
const mongoose = require('mongoose');

const StoreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Store name is required'],
    trim: true
  },
  domain: {
    type: String,
    required: [true, 'Domain is required'],
    unique: true,
    trim: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  status: {
    type: String,
    enum: ['active', 'paused', 'draft'],
    default: 'draft'
  },
  mode: {
    type: String,
    enum: ['autonomous', 'hybrid', 'manual'],
    default: 'autonomous'
  },
  settings: {
    theme: {
      type: String,
      default: 'default'
    },
    integrations: {
      type: Map,
      of: mongoose.Schema.Types.Mixed,
      default: {}
    }
  },
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  performance: {
    revenue: {
      type: Number,
      default: 0
    },
    profit: {
      type: Number,
      default: 0
    },
    roas: {
      type: Number,
      default: 0
    },
    conversionRate: {
      type: Number,
      default: 0
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Index for faster queries
StoreSchema.index({ userId: 1 });
StoreSchema.index({ domain: 1 }, { unique: true });

// Static method to find store by domain
StoreSchema.statics.findByDomain = function(domain) {
  return this.findOne({ domain });
};

// Pre-save middleware to update the updatedAt field
StoreSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Store', StoreSchema);

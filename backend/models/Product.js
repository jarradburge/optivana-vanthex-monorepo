// Optivana API - Product Model
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Product title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Product description is required']
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price cannot be negative']
  },
  images: [{
    type: String,
    required: [true, 'At least one image is required']
  }],
  category: {
    type: String,
    required: [true, 'Category is required']
  },
  source: {
    platform: {
      type: String,
      required: [true, 'Source platform is required']
    },
    externalId: {
      type: String,
      required: [true, 'External ID is required']
    },
    url: String
  },
  emotionalAnalysis: {
    primaryEmotion: {
      type: String
    },
    emotionalSpectrum: [{
      type: String
    }],
    buyerPersonas: [{
      persona: String,
      matchScore: Number,
      demographics: mongoose.Schema.Types.Mixed,
      painPoints: [String],
      motivations: [String],
      emotionalTriggers: [String]
    }]
  },
  performance: {
    trendScore: {
      type: Number,
      default: 0
    },
    conversionRate: {
      type: Number,
      default: 0
    },
    popularity: {
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

// Indexes for faster queries
ProductSchema.index({ category: 1 });
ProductSchema.index({ 'source.platform': 1, 'source.externalId': 1 }, { unique: true });
ProductSchema.index({ 'emotionalAnalysis.primaryEmotion': 1 });
ProductSchema.index({ 'performance.trendScore': -1 });

// Pre-save middleware to update the updatedAt field
ProductSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Product', ProductSchema);

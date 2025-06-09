// Optivana API - Campaign Model
const mongoose = require('mongoose');

const CampaignSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Campaign name is required'],
    trim: true
  },
  storeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Store',
    required: [true, 'Store ID is required']
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, 'Product ID is required']
  },
  platform: {
    type: String,
    enum: ['facebook', 'instagram', 'tiktok', 'google', 'pinterest'],
    required: [true, 'Platform is required']
  },
  status: {
    type: String,
    enum: ['draft', 'active', 'paused', 'completed', 'failed'],
    default: 'draft'
  },
  budget: {
    daily: {
      type: Number,
      required: [true, 'Daily budget is required'],
      min: [1, 'Daily budget must be at least 1']
    },
    total: {
      type: Number,
      required: [true, 'Total budget is required'],
      min: [1, 'Total budget must be at least 1']
    },
    spent: {
      type: Number,
      default: 0
    }
  },
  targeting: {
    audienceType: {
      type: String,
      enum: ['lookalike', 'interest', 'custom', 'broad'],
      default: 'broad'
    },
    demographics: {
      ageRange: {
        min: {
          type: Number,
          min: 13,
          max: 65,
          default: 18
        },
        max: {
          type: Number,
          min: 13,
          max: 65,
          default: 65
        }
      },
      gender: {
        type: String,
        enum: ['all', 'male', 'female'],
        default: 'all'
      },
      locations: [{
        type: String
      }],
      interests: [{
        type: String
      }]
    },
    emotionalTriggers: [{
      type: String
    }]
  },
  variants: [{
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ['draft', 'active', 'paused', 'completed', 'winner'],
      default: 'draft'
    },
    creativeType: {
      type: String,
      enum: ['image', 'video', 'carousel'],
      required: true
    },
    creativeUrl: {
      type: String,
      required: true
    },
    headline: String,
    description: String,
    callToAction: String,
    performance: {
      impressions: {
        type: Number,
        default: 0
      },
      clicks: {
        type: Number,
        default: 0
      },
      ctr: {
        type: Number,
        default: 0
      },
      conversions: {
        type: Number,
        default: 0
      },
      conversionRate: {
        type: Number,
        default: 0
      },
      costPerConversion: {
        type: Number,
        default: 0
      },
      revenue: {
        type: Number,
        default: 0
      },
      roas: {
        type: Number,
        default: 0
      }
    }
  }],
  performance: {
    impressions: {
      type: Number,
      default: 0
    },
    clicks: {
      type: Number,
      default: 0
    },
    ctr: {
      type: Number,
      default: 0
    },
    conversions: {
      type: Number,
      default: 0
    },
    conversionRate: {
      type: Number,
      default: 0
    },
    costPerConversion: {
      type: Number,
      default: 0
    },
    revenue: {
      type: Number,
      default: 0
    },
    roas: {
      type: Number,
      default: 0
    }
  },
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
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
CampaignSchema.index({ storeId: 1 });
CampaignSchema.index({ productId: 1 });
CampaignSchema.index({ platform: 1 });
CampaignSchema.index({ status: 1 });
CampaignSchema.index({ 'performance.roas': -1 });

// Pre-save middleware to update the updatedAt field
CampaignSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Campaign', CampaignSchema);

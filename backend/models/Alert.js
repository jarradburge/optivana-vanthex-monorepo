// Optivana API - Alert Model
const mongoose = require('mongoose');

const AlertSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  storeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Store'
  },
  campaignId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Campaign'
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  },
  type: {
    type: String,
    enum: ['info', 'success', 'warning', 'error'],
    required: [true, 'Alert type is required']
  },
  category: {
    type: String,
    enum: ['performance', 'system', 'product', 'campaign', 'order', 'payment'],
    required: [true, 'Alert category is required']
  },
  title: {
    type: String,
    required: [true, 'Alert title is required']
  },
  message: {
    type: String,
    required: [true, 'Alert message is required']
  },
  actionRequired: {
    type: Boolean,
    default: false
  },
  actionUrl: {
    type: String
  },
  read: {
    type: Boolean,
    default: false
  },
  readAt: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Indexes for faster queries
AlertSchema.index({ userId: 1 });
AlertSchema.index({ storeId: 1 });
AlertSchema.index({ read: 1 });
AlertSchema.index({ type: 1 });
AlertSchema.index({ category: 1 });
AlertSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Alert', AlertSchema);

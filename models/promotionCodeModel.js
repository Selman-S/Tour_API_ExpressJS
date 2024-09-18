// models/promotionCodeModel.js
const { mongoose } = require('../config/db');

/* ------------------------------------------------------- */

const PromotionCodeSchema = new mongoose.Schema({

  code: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  discountAmount: {
    type: Number,
    default: 0,
  },
  discountPercentage: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  validUntil: {
    type: Date,
    required: true,
  }

}, { collection: 'promotioncodes', timestamps: true });

/* ------------------------------------------------------- */

module.exports = mongoose.model('PromotionCode', PromotionCodeSchema);

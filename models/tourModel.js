// models/tourModel.js
const { mongoose } = require('../config/db');

/* ------------------------------------------------------- */

const TourSchema = new mongoose.Schema({

  name: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  details: {
    type: String,
    trim: true,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
    required: true, // Tur süresi (gün)
  },
  location: {
    type: String,
    trim: true,
    required: true,
  },
  categories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  }],
  photos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Photo',
  }],
  dates: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TourDate',
  }],

}, { collection: 'tours', timestamps: true });

/* ------------------------------------------------------- */

module.exports = mongoose.model('Tour', TourSchema);

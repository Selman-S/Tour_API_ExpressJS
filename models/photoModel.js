// models/photoModel.js
const { mongoose } = require('../config/db');

/* ------------------------------------------------------- */

const PhotoSchema = new mongoose.Schema({

  tour: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tour',
    required: true,
  },
  url: {
    type: String,
    trim: true,
    required: true,
  },
  caption: {
    type: String,
    trim: true,
  }

}, { collection: 'photos', timestamps: true });

/* ------------------------------------------------------- */

module.exports = mongoose.model('Photo', PhotoSchema);

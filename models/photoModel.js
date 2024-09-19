const { mongoose } = require('../config/db');

/* ------------------------------------------------------- */

const PhotoSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true, // Fotoğraf URL'si
  },
  description: {
    type: String,
    trim: true,
  },
}, { collection: 'photos', timestamps: true });

/* ------------------------------------------------------- */

module.exports = mongoose.model('Photo', PhotoSchema);

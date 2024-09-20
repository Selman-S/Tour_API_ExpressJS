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
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true, // Turu oluşturan kullanıcı
  }
}, { collection: 'photos', timestamps: true });

/* ------------------------------------------------------- */

module.exports = mongoose.model('Photo', PhotoSchema);

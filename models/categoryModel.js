const { mongoose } = require('../config/db');

/* ------------------------------------------------------- */

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    unique: true, // Her kategori adı benzersiz olmalı
  },
  description: {
    type: String,
    trim: true,
  },
  photo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Photo', // Kategoriye ait fotoğraf
  },
  parentCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category', // Üst kategori referansı
    default: null, // Varsayılan olarak üst kategorisi yok
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true, // Turu oluşturan kullanıcı
  }
}, { collection: 'categories', timestamps: true });

/* ------------------------------------------------------- */

module.exports = mongoose.model('Category', CategorySchema);

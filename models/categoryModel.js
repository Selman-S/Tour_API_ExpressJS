// models/categoryModel.js
const { mongoose } = require('../config/db');

/* ------------------------------------------------------- */

const CategorySchema = new mongoose.Schema({

  name: {
    type: String,
    trim: true,
    required: true,
    unique: true
  },
  description: {
    type: String,
    trim: true,
  },
  parentCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    default: null,
  }

}, { collection: 'categories', timestamps: true });

/* ------------------------------------------------------- */

module.exports = mongoose.model('Category', CategorySchema);

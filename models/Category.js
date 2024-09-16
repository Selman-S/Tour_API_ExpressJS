const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  parentCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null }
}, {
  collection: 'category',
  timestamps: true
});

module.exports = mongoose.model('Category', categorySchema);

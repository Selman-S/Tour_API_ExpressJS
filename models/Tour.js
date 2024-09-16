const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  title: { type: String, required: true },
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
  images: [String],
  price: { type: Number, required: true },
  dates: [{ startDate: Date, endDate: Date }],
  description: String,
}, {
  collection: 'tour',
  timestamps: true
});

module.exports = mongoose.model('Tour', tourSchema);

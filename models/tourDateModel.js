// models/tourDateModel.js
const { mongoose } = require('../config/db');

/* ------------------------------------------------------- */

const TourDateSchema = new mongoose.Schema({

  tour: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tour',
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  bookings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
  }],

}, { collection: 'tourdates', timestamps: true });

/* ------------------------------------------------------- */

module.exports = mongoose.model('TourDate', TourDateSchema);

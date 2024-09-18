// models/bookingModel.js
const { mongoose } = require('../config/db');

/* ------------------------------------------------------- */

const PassengerSchema = new mongoose.Schema({

  name: {
    type: String,
    trim: true,
    required: true,
  },
  surname: {
    type: String,
    trim: true,
    required: true,
  },
  phone: {
    type: String,
    trim: true,
    required: true,
  },
  birthDate: {
    type: Date,
    required: true,
  },
  idNumber: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
  },
  gender: {
    type: String,
    trim: true,
    required: true,
    enum: ['Erkek', 'Kadın', 'Diğer'],
  }

}, { _id: false });

const BookingSchema = new mongoose.Schema({

  tourDate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TourDate',
    required: true,
  },
  passengers: [PassengerSchema],
  totalPrice: {
    type: Number,
    required: true,
  },
  promotionCode: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PromotionCode',
    default: null,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  }

}, { collection: 'bookings', timestamps: true });

/* ------------------------------------------------------- */

module.exports = mongoose.model('Booking', BookingSchema);

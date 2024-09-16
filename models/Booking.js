const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  tour: { type: mongoose.Schema.Types.ObjectId, ref: 'Tour' },
  passengers: [
    {
      name: String,
      surname: String,
      dateOfBirth: Date,
      idNumber: String,
      gender: String,
      phone: String,
      email: String
    }
  ],
  totalPrice: Number,
  discountCode: String,
  paymentInfo: {
    cardNumber: String,
    expiryMonth: String,
    expiryYear: String,
    cvc: String
  }
}, {
  collection: 'booking',
  timestamps: true
});

module.exports = mongoose.model('Booking', bookingSchema);

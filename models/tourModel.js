const { mongoose } = require('../config/db');

/* ------------------------------------------------------- */

const TourSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  details: {
    type: String,
    trim: true,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
    required: true, // Tur süresi (gün)
  },
  location: {
    type: String,
    trim: true,
    required: true,
  },
  categories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  }],
  photos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Photo',
  }],
  isActive: {
    type: Boolean,
    default: true, // Varsayılan olarak aktif
  },
  startDate: {
    type: Date,
    required: true, // Tur başlangıç tarihi
  },
  endDate: {
    type: Date,
    required: true, // Tur bitiş tarihi
  },
  capacity: {
    type: Number,
    required: true,
    default: 50, // Varsayılan kontenjan
  },
  seatsTaken: {
    type: Number,
    default: 0, // Başlangıçta dolu koltuk sayısı
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true, // Turu oluşturan kullanıcı
  }
}, { collection: 'tours', timestamps: true });

TourSchema.pre('save', function(next) {
  // Eğer turun bitiş tarihi geçmişse turu pasif yap
  if (this.endDate < new Date()) {
    this.isActive = false;
  }
  next();
});

/* ------------------------------------------------------- */

module.exports = mongoose.model('Tour', TourSchema);

const Booking = require('../models/bookingModel');
const Tour = require('../models/tourModel');

// Yeni bir rezervasyon oluşturma (sadece kullanıcılar)
exports.createBooking = async (req, res, next) => {
  try {
    const { tourDate, passengers, totalPrice, promotionCode } = req.body;

    // Turun mevcut olup olmadığını kontrol et
    const tour = await Tour.findById(tourDate);
    if (!tour || !tour.isActive) {
      return res.status(400).json({ message: 'Geçersiz veya aktif olmayan bir tur seçildi.' });
    }

    // Yeni bir rezervasyon oluştur
    const booking = await Booking.create({
      tourDate,
      passengers,
      totalPrice,
      promotionCode,
      user: req.user.id,
      createdBy: req.user.id,
    });

    res.status(201).json({ success: true, data: booking });
  } catch (err) {
    next(err);
  }
};

// Tüm rezervasyonları listeleme (sadece admin)
exports.listBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find()
      .populate('tourDate', 'startDate endDate')
      .populate('promotionCode', 'code')
      .populate('user', 'username email');

    res.status(200).json({ success: true, data: bookings });
  } catch (err) {
    next(err);
  }
};

// Rezervasyon detaylarını gösterme (sadece kendi rezervasyonu veya admin)
exports.getBookingDetails = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('tourDate', 'startDate endDate')
      .populate('promotionCode', 'code')
      .populate('user', 'username email');

    if (!booking) {
      return res.status(404).json({ message: 'Rezervasyon bulunamadı.' });
    }

    // Kullanıcı doğrulaması
    if (booking.user && booking.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Bu rezervasyonu görüntüleme yetkiniz yok.' });
    }

    res.status(200).json({ success: true, data: booking });
  } catch (err) {
    next(err);
  }
};

// Rezervasyon silme (sadece admin)
exports.deleteBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Rezervasyon bulunamadı.' });
    }

    res.status(200).json({ success: true, message: 'Rezervasyon silindi.' });
  } catch (err) {
    next(err);
  }
};

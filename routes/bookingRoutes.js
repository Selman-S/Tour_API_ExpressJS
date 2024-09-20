const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const permissions = require('../middlewares/permissions');

// Yeni rezervasyon oluşturma (sadece kullanıcılar)
router.post('/', permissions.isLogin, bookingController.createBooking);

// Tüm rezervasyonları listeleme (sadece admin)
router.get('/', permissions.isLogin, permissions.isAdmin, bookingController.listBookings);

// Rezervasyon detaylarını görüntüleme (sadece kendi rezervasyonu veya admin)
router.get('/:id', permissions.isLogin, bookingController.getBookingDetails);

// Rezervasyon silme (sadece admin)
router.delete('/:id', permissions.isLogin, permissions.isAdmin, bookingController.deleteBooking);

module.exports = router;

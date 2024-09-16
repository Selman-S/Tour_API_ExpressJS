const Booking = require('../models/Booking');

// Rezervasyon oluşturma
exports.createBooking = async (req, res) => {
  const { tourId, passengers, discountCode, paymentInfo } = req.body;

  // İndirim kodu uygulama işlemleri burada yapılabilir

  const newBooking = new Booking({
    user: req.user.id, // authMiddleware kullanarak kullanıcıyı alıyoruz
    tour: tourId,
    passengers,
    totalPrice: calculatedPrice, // İndirim uygulanmış fiyat
    discountCode,
    paymentInfo
  });

  await newBooking.save();
  res.status(201).json({ message: 'Rezervasyon başarıyla oluşturuldu.' });
};

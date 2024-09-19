const Tour = require('../models/tourModel');

// Yeni tur oluşturma (sadece acenta ve admin)
exports.createTour = async (req, res, next) => {
  try {
    const { name, details, price, duration, location, categories, photos, startDate, endDate, capacity } = req.body;

    const tour = await Tour.create({
      name,
      details,
      price,
      duration,
      location,
      categories,
      photos,
      startDate,
      endDate,
      capacity,
      createdBy: req.user.id,
      isActive: true,
    });

    res.status(201).json({ success: true, data: tour });
  } catch (err) {
    next(err);
  }
};

// Tüm turları listeleme (herkese açık)
exports.listTours = async (req, res, next) => {
  try {
    const { location, startDate, endDate, category, page = 1, limit = 10 } = req.query;

    // Arama ve filtreleme koşulları
    const query = {
      isActive: true,
      ...(location && { location: { $regex: location, $options: 'i' } }),
      ...(startDate && endDate && {
        startDate: { $gte: new Date(startDate) },
        endDate: { $lte: new Date(endDate) },
      }),
      ...(category && { categories: category }),
    };

    const tours = await Tour.find(query)
      .populate('categories', 'name')
      .populate('photos', 'url')
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const totalTours = await Tour.countDocuments(query);

    res.status(200).json({
      success: true,
      data: tours,
      pagination: {
        total: totalTours,
        currentPage: page,
        totalPages: Math.ceil(totalTours / limit),
      },
    });
  } catch (err) {
    next(err);
  }
};

// Tur detay görüntüleme (herkese açık)
exports.getTourDetails = async (req, res, next) => {
  try {
    const tour = await Tour.findById(req.params.id)
      .populate('categories', 'name')
      .populate('photos', 'url');

    if (!tour || !tour.isActive) {
      return res.status(404).json({ message: 'Tur bulunamadı veya aktif değil.' });
    }

    res.status(200).json({ success: true, data: tour });
  } catch (err) {
    next(err);
  }
};

// Tur güncelleme (sadece tur oluşturucusu veya admin)
exports.updateTour = async (req, res, next) => {
  try {
    const { name, details, price, duration, location, categories, photos, startDate, endDate, capacity } = req.body;

    const tour = await Tour.findById(req.params.id);

    if (!tour) {
      return res.status(404).json({ message: 'Tur bulunamadı' });
    }

    if (tour.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Bu turu güncelleme yetkiniz yok.' });
    }

    // Turu güncelle
    tour.name = name || tour.name;
    tour.details = details || tour.details;
    tour.price = price || tour.price;
    tour.duration = duration || tour.duration;
    tour.location = location || tour.location;
    tour.categories = categories || tour.categories;
    tour.photos = photos || tour.photos;
    tour.startDate = startDate || tour.startDate;
    tour.endDate = endDate || tour.endDate;
    tour.capacity = capacity || tour.capacity;

    await tour.save();

    res.status(200).json({ success: true, data: tour });
  } catch (err) {
    next(err);
  }
};

// Tur silme (isActive false yapma)
exports.deleteTour = async (req, res, next) => {
  try {
    const tour = await Tour.findById(req.params.id);

    if (!tour) {
      return res.status(404).json({ message: 'Tur bulunamadı' });
    }

    if (tour.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Bu turu silme yetkiniz yok.' });
    }

    tour.isActive = false;
    await tour.save();

    res.status(200).json({ success: true, message: 'Tur pasif hale getirildi.' });
  } catch (err) {
    next(err);
  }
};

// Kontenjan kontrolü ve satın alma işlemi
exports.purchaseTour = async (req, res, next) => {
  try {
    const tour = await Tour.findById(req.params.id);

    if (!tour || !tour.isActive || tour.seatsTaken >= tour.capacity) {
      return res.status(400).json({ message: 'Bu tur dolu veya aktif değil.' });
    }

    // Koltuk sayısını artır ve turu güncelle
    tour.seatsTaken += 1;
    await tour.save();

    res.status(200).json({ success: true, message: 'Tur başarıyla satın alındı.' });
  } catch (err) {
    next(err);
  }
};

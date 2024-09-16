const Tour = require('../models/Tour');

// Tüm turları listeleme
exports.getAllTours = async (req, res) => {
  const tours = await Tour.find().populate('categories');
  res.status(200).json(tours);
};

// Tur arama
exports.searchTours = async (req, res) => {
  const { destination, startDate, endDate } = req.query;
  const tours = await Tour.find({
    title: { $regex: destination, $options: 'i' },
    dates: {
      $elemMatch: {
        startDate: { $gte: new Date(startDate) },
        endDate: { $lte: new Date(endDate) }
      }
    }
  });
  res.status(200).json(tours);
};

// Tur detayı
exports.getTourById = async (req, res) => {
  const tour = await Tour.findById(req.params.id).populate('categories');
  res.status(200).json(tour);
};

// Tur oluşturma (Admin için)
exports.createTour = async (req, res) => {
  try {
    const newTour = new Tour(req.body);
    const savedTour = await newTour.save();
    res.status(201).json(savedTour);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


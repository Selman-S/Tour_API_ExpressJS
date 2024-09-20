const Photo = require('../models/photoModel');

// Yeni fotoğraf yükleme (sadece admin ve acenta)
exports.uploadPhoto = async (req, res, next) => {
  try {
    const { url, description } = req.body;

    const photo = await Photo.create({ url, description });
    res.status(201).json({ success: true, data: photo });
  } catch (err) {
    next(err);
  }
};

// Tüm fotoğrafları listeleme (herkese açık)
exports.listPhotos = async (req, res, next) => {
  try {
    const details = await res.getModelListDetails(Photo);

    const photos = await res.getModelList(Photo, {  }, );
   
    res.status(200).json({ success: true, data: photos,details });
  } catch (err) {
    next(err);
  }
};

// Fotoğraf silme (sadece admin)
exports.deletePhoto = async (req, res, next) => {
  try {
    const photo = await Photo.findByIdAndDelete(req.params.id);

    if (!photo) {
      return res.status(404).json({ message: 'Fotoğraf bulunamadı' });
    }

    res.status(200).json({ success: true, message: 'Fotoğraf silindi.' });
  } catch (err) {
    next(err);
  }
};

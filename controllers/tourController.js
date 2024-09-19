// Tur "isActive" false yaparak pasif hale getirme (admin ve acentalar için)
exports.deleteTour = async (req, res, next) => {
    try {
      const tour = await Tour.findById(req.params.id);
  
      if (!tour) {
        return res.status(404).json({ message: 'Tur bulunamadı' });
      }
  
      tour.isActive = false;
      await tour.save();
  
      res.status(200).json({ success: true, message: 'Tur pasif hale getirildi.' });
    } catch (err) {
      next(err); // Hata olursa error middleware'ine aktar
    }
  };
  
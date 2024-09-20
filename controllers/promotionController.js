const PromotionCode = require('../models/promotionCodeModel');

// Yeni bir promosyon kodu oluşturma (sadece admin)
exports.createPromotionCode = async (req, res, next) => {
  try {
    const { code, discountAmount, discountPercentage, validUntil } = req.body;

    const promotionCode = await PromotionCode.create({
      code,
      discountAmount,
      discountPercentage,
      validUntil,
    });

    res.status(201).json({ success: true, data: promotionCode });
  } catch (err) {
    next(err);
  }
};

// Tüm promosyon kodlarını listeleme (sadece admin)
exports.listPromotionCodes = async (req, res, next) => {
  try {
    const promotionCodes = await PromotionCode.find();
    res.status(200).json({ success: true, data: promotionCodes });
  } catch (err) {
    next(err);
  }
};

// Promosyon kodu güncelleme (sadece admin)
exports.updatePromotionCode = async (req, res, next) => {
  try {
    const { code, discountAmount, discountPercentage, validUntil, isActive } = req.body;

    const promotionCode = await PromotionCode.findById(req.params.id);

    if (!promotionCode) {
      return res.status(404).json({ message: 'Promosyon kodu bulunamadı.' });
    }

    promotionCode.code = code || promotionCode.code;
    promotionCode.discountAmount = discountAmount || promotionCode.discountAmount;
    promotionCode.discountPercentage = discountPercentage || promotionCode.discountPercentage;
    promotionCode.validUntil = validUntil || promotionCode.validUntil;
    promotionCode.isActive = isActive !== undefined ? isActive : promotionCode.isActive;

    await promotionCode.save();

    res.status(200).json({ success: true, data: promotionCode });
  } catch (err) {
    next(err);
  }
};

// Promosyon kodu silme (sadece admin)
exports.deletePromotionCode = async (req, res, next) => {
  try {
    const promotionCode = await PromotionCode.findByIdAndDelete(req.params.id);

    if (!promotionCode) {
      return res.status(404).json({ message: 'Promosyon kodu bulunamadı.' });
    }

    res.status(200).json({ success: true, message: 'Promosyon kodu silindi.' });
  } catch (err) {
    next(err);
  }
};

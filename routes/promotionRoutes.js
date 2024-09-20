const express = require('express');
const router = express.Router();
const promotionController = require('../controllers/promotionController');
const permissions = require('../middlewares/permissions');

// Yeni promosyon kodu oluşturma (sadece admin)
router.post('/', permissions.isLogin, permissions.isAdmin, promotionController.createPromotionCode);

// Tüm promosyon kodlarını listeleme (sadece admin)
router.get('/', permissions.isLogin, permissions.isAdmin, promotionController.listPromotionCodes);

// Promosyon kodu güncelleme (sadece admin)
router.put('/:id', permissions.isLogin, permissions.isAdmin, promotionController.updatePromotionCode);

// Promosyon kodu silme (sadece admin)
router.delete('/:id', permissions.isLogin, permissions.isAdmin, promotionController.deletePromotionCode);

module.exports = router;

const express = require('express');
const router = express.Router();
const tourController = require('../controllers/tourController');
const permissions = require('../middlewares/permissions');

// Yeni tur oluşturma (acenta ve admin)
router.post('/', permissions.isLogin, permissions.isAgentOrAdmin, tourController.createTour);

// Tüm turları listeleme (herkese açık)
router.get('/', tourController.listTours);

// Tur detay görüntüleme (herkese açık)
router.get('/:id', tourController.getTourDetails);

// Tur güncelleme (turu oluşturan veya admin)
router.put('/:id', permissions.isLogin, tourController.updateTour);

// Tur silme (turu oluşturan veya admin)
router.delete('/:id', permissions.isLogin, tourController.deleteTour);

// Tur satın alma (herkese açık)
router.post('/:id/purchase', permissions.isLogin, tourController.purchaseTour);

module.exports = router;

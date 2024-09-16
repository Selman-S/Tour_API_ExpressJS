const express = require('express');
const router = express.Router();
const tourController = require('../controllers/tourController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', tourController.getAllTours);
router.get('/search', tourController.searchTours);
router.get('/:id', tourController.getTourById);

// Admin rotaları
router.post(
  '/',
  authMiddleware.protect,
  authMiddleware.authorize('admin'),
  tourController.createTour
);

module.exports = router;

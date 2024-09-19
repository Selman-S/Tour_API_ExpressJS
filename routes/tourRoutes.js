const express = require('express');
const router = express.Router();
const tourController = require('../controllers/tourController');
const permissions = require('../middlewares/permissions');

// Tur ekleme (sadece acenta)
router.post('/', permissions.isLogin, permissions.isAgent, tourController.createTour);

// Turu onaylama (sadece admin)
router.put('/approve/:id', permissions.isLogin, permissions.isAdmin, tourController.approveTour);
router.delete('/:id', permissions.isLogin, permissions.isAdmin, tourController.deleteTour);

module.exports = router;

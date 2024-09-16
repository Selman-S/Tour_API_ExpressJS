const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// Kullanıcı rolü güncelleme (Sadece admin)
router.put(
  '/role',
  authMiddleware.protect,
  authMiddleware.authorize('admin'),
  userController.updateUserRole
);

module.exports = router;

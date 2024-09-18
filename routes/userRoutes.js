const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect, adminProtect } = require('../middlewares/authMiddleware');

// Kullanıcı CRUD işlemleri
router.get('/profile', protect, userController.getUserProfile); // Kullanıcı profilini getir
router.put('/profile', protect, userController.updateUserProfile); // Kullanıcı profilini güncelle
router.delete('/profile', protect, userController.deleteUser); // Kullanıcı hesabını sil

// Admin tarafından tüm kullanıcıları listeleme
router.get('/', protect, adminProtect, userController.listUsers);

// Kullanıcı oluşturma (admin tarafından)
router.post('/', protect, adminProtect, userController.createUser);

module.exports = router;

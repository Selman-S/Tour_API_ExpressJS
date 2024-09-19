const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const permissions = require('../middlewares/permissions');

// Tüm kullanıcı  listesini gösterme (sadece admin)
router.get('/users', permissions.isLogin, permissions.isAdmin, userController.listUsers)


// Tüm  acenta listesini gösterme (sadece admin)
router.get('/agents', permissions.isLogin, permissions.isAdmin, userController.listAgents);

// Tüm  acenta listesini gösterme (sadece admin)
router.get('/admins', permissions.isLogin, permissions.isAdmin, userController.listAdmins);

// Kullanıcı oluşturma (sadece admin)
router.post('/', permissions.isLogin, permissions.isAdmin, userController.createUserByAdmin);

// Kullanıcı rolü güncelleme (sadece admin)
router.put('/role/:id', permissions.isLogin, permissions.isAdmin, userController.updateUserRole);

// Kullanıcı profilini gösterme (kendi profili)
router.get('/profile', permissions.isLogin, userController.getUserProfile);

// Kullanıcı bilgilerini güncelleme (sadece kendi hesabı için)
router.put('/profile', permissions.isLogin, userController.updateUserProfile);

// Kullanıcı silme (sadece admin)
router.delete('/:id', permissions.isLogin, permissions.isAdmin, userController.deleteUserByAdmin);

// Kullanıcı silme (kendi hesabı için)
router.delete('/', permissions.isLogin, userController.deleteUser);


module.exports = router;


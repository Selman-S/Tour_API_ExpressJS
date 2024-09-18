const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const permissions = require('../middlewares/permissions');

// Kullanıcı rolü güncelleme (sadece admin)
router.put('/role', permissions.isLogin, permissions.isAdmin, userController.updateUserRole);

// Tüm kullanıcı  listesini gösterme (sadece admin)
router.get('/users', permissions.isLogin, permissions.isAdmin, userController.listUsers);

// Tüm  acenta listesini gösterme (sadece admin)
router.get('/agents', permissions.isLogin, permissions.isAdmin, userController.listAgents);

// Tüm  acenta listesini gösterme (sadece admin)
router.get('/admins', permissions.isLogin, permissions.isAdmin, userController.listAdmins);

// Kullanıcı silme (sadece admin)
router.delete('/:id', permissions.isLogin, permissions.isAdmin, userController.deleteUser);

module.exports = router;

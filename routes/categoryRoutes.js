const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const permissions = require('../middlewares/permissions');

// Yeni kategori oluşturma (sadece admin)
router.post('/', permissions.isLogin, permissions.isAdmin, categoryController.createCategory);

// Kategori güncelleme (sadece admin)
router.put('/:id', permissions.isLogin, permissions.isAdmin, categoryController.updateCategory);

// Tüm kategorileri listeleme (herkese açık)
router.get('/', categoryController.listCategories);

// Kategori silme (sadece admin)
router.delete('/:id', permissions.isLogin, permissions.isAdmin, categoryController.deleteCategory);

module.exports = router;

const express = require('express');
const router = express.Router();
const photoController = require('../controllers/photoController');
const permissions = require('../middlewares/permissions');

// Yeni fotoğraf yükleme (acenta ve admin)
router.post('/', permissions.isLogin, permissions.isAgentOrAdmin, photoController.uploadPhoto);

// Tüm fotoğrafları listeleme (acenta ve admin)
router.get('/',permissions.isAgentOrAdmin, photoController.listPhotos);

// Fotoğraf silme (sadece admin)
router.delete('/:id', permissions.isLogin, permissions.isAdmin, photoController.deletePhoto);

module.exports = router;

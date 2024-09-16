const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', categoryController.getAllCategories);
router.get('/:id/subcategories', categoryController.getSubCategories);

// Admin rotaları
router.post(
  '/',
  authMiddleware.protect,
  authMiddleware.authorize('admin'),
  categoryController.createCategory
);

module.exports = router;

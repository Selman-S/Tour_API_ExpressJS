const Category = require('../models/Category');

// Kategorileri listeleme
exports.getAllCategories = async (req, res) => {
  const categories = await Category.find({ parentCategory: null });
  res.status(200).json(categories);
};

// Alt kategorileri listeleme
exports.getSubCategories = async (req, res) => {
  const subCategories = await Category.find({ parentCategory: req.params.id });
  res.status(200).json(subCategories);
};

// Kategori oluşturma (Admin için)
exports.createCategory = async (req, res) => {
  const newCategory = new Category(req.body);
  await newCategory.save();
  res.status(201).json(newCategory);
};

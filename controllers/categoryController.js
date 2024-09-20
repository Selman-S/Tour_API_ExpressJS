const Category = require('../models/categoryModel');

// Yeni kategori oluşturma (sadece admin)
exports.createCategory = async (req, res, next) => {
  try {
    const { name, description, photo, parentCategory } = req.body;

    const category = await Category.create({ name, description, photo, parentCategory });
    res.status(201).json({ success: true, data: category });
  } catch (err) {
    next(err);
  }
};

// Kategoriyi güncelleme (sadece admin)
exports.updateCategory = async (req, res, next) => {
  try {
    const { name, description, photo, parentCategory } = req.body;

    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: 'Kategori bulunamadı' });
    }

    // Kategoriyi güncelle
    category.name = name || category.name;
    category.description = description || category.description;
    category.photo = photo || category.photo;
    category.parentCategory = parentCategory || category.parentCategory;

    await category.save();

    res.status(200).json({ success: true, data: category });
  } catch (err) {
    next(err);
  }
};

// Tüm kategorileri listeleme (herkese açık)
exports.listCategories = async (req, res, next) => {
  try {
    // const categories = await Category.find()
    //   .populate('photo', 'url')
    //   .populate('parentCategory', 'name'); // Parent kategoriyi getir

      const details = await res.getModelListDetails(Category);

      const categories = await res.getModelList(Category, {  }, ).populate('photo', 'url')
      .populate('parentCategory', 'name');

    res.status(200).json({ success: true, data: categories,details });
  } catch (err) {
    next(err);
  }
};

// Kategori silme (sadece admin)
exports.deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: 'Kategori bulunamadı' });
    }

    await category.remove();
    res.status(200).json({ success: true, message: 'Kategori silindi.' });
  } catch (err) {
    next(err);
  }
};

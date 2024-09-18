// controllers/userController.js
const User = require('../models/userModel');

// Tüm kullanıcıları listeleme (sadece admin)
exports.listUsers = async (req, res) => {
  // Sadece admin erişebilir
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Yalnızca admin kullanıcılar bu işlemi gerçekleştirebilir.' });
  }

  const users = await User.find().select('-password'); // Şifreleri döndürme
  res.status(200).json({ success: true, data: users });
};

// Kullanıcı oluşturma (bu sadece admin tarafından yapılabilir)
exports.createUser = async (req, res) => {
  const { username, email, password, role } = req.body;

  const user = await User.create({ username, email, password, role });
  res.status(201).json({ success: true, data: user });
};

// Belirli bir kullanıcının profilini gösterme
exports.getUserProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.status(200).json({ success: true, data: user });
};

// Kullanıcı bilgilerini güncelleme (sadece kendi hesabı için)
exports.updateUserProfile = async (req, res) => {
  const { username, email } = req.body;

  const user = await User.findById(req.user.id);

  if (!user) {
    return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
  }

  user.username = username || user.username;
  user.email = email || user.email;

  await user.save();

  res.status(200).json({ success: true, data: user });
};

// Kullanıcı hesabını silme (sadece kendi hesabı için)
exports.deleteUser = async (req, res) => {
  const user = await User.findByIdAndDelete(req.user.id);

  if (!user) {
    return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
  }

  res.status(200).json({ success: true, message: 'Kullanıcı başarıyla silindi' });
};

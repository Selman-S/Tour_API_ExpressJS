const User = require('../models/userModel');


// Tüm kullanıcıları listeleme (sadece user rolündeki kullanıcılar)
exports.listUsers = async (req, res, next) => {
  try {
    // Sadece user rolüne sahip kullanıcıları getir, şifre alanlarını döndürme
    const users = await User.find({ role: 'user' }).select('-password');
    res.status(200).json({ success: true, data: users });
  } catch (err) {
    next(err); // Hata olursa error middleware'ine aktar
  }
};

// Sadece acenta rolüne sahip kullanıcıları listeleme (sadece admin)
exports.listAgents = async (req, res, next) => {
  try {
    // Sadece acenta rolüne sahip kullanıcıları getir, şifre alanlarını döndürme
    const agents = await User.find({ role: 'agent' }).select('-password');
    res.status(200).json({ success: true, data: agents });
  } catch (err) {
    next(err); // Hata olursa error middleware'ine aktar
  }
};


// Admin rolüne sahip kullanıcıları listeleme
exports.listAdmins = async (req, res, next) => {
  try {
    // Sadece admin rolüne sahip kullanıcıları getir, şifre alanlarını döndürme
    const admins = await User.find({ role: 'admin' }).select('-password');
    res.status(200).json({ success: true, data: admins });
  } catch (err) {
    next(err); // Hata olursa error middleware'ine aktar
  }
};

// Kullanıcı oluşturma (sadece admin tarafından yapılabilir)
exports.createUserByAdmin = async (req, res, next) => {
  try {
    const { username, email, password, role } = req.body;

    const user = await User.create({ username, email, password, role });
    res.status(201).json({ success: true, data: user });
  } catch (err) {
    next(err); // Hata olursa error middleware'ine aktar
  }
};

// Belirli bir kullanıcının profilini gösterme (kendi profili)
exports.getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    next(err); // Hata olursa error middleware'ine aktar
  }
};

// Kullanıcı bilgilerini güncelleme (sadece kendi hesabı için)
exports.updateUserProfile = async (req, res, next) => {
  try {
    const { username, email } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
    }

    user.username = username || user.username;
    user.email = email || user.email;

    await user.save();

    res.status(200).json({ success: true, data: user });
  } catch (err) {
    next(err); // Hata olursa error middleware'ine aktar
  }
};

// Kullanıcı hesabını silme (sadece kendi hesabı için)
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
    }

    res.status(200).json({ success: true, message: 'Kullanıcı başarıyla silindi' });
  } catch (err) {
    next(err); // Hata olursa error middleware'ine aktar
  }
};

// Admin tarafından kullanıcı silme
exports.deleteUserByAdmin = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
    }

    res.status(200).json({ success: true, message: 'Kullanıcı başarıyla silindi' });
  } catch (err) {
    next(err); // Hata olursa error middleware'ine aktar
  }
};

// Admin tarafından kullanıcı rolü güncelleme
exports.updateUserRole = async (req, res, next) => {
  try {
    const { role } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
    }

    user.role = role;
    await user.save();

    res.status(200).json({ success: true, data: user });
  } catch (err) {
    next(err); // Hata olursa error middleware'ine aktar
  }
};

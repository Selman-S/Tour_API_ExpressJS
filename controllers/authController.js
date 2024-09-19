const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// Access token oluşturma fonksiyonu
const generateAccessToken = (userId, role) => {
  return jwt.sign(
    { id: userId, role },
    process.env.JWT_SECRET,
    { expiresIn: '3h' }
  );
};

// Refresh token oluşturma fonksiyonu
const generateRefreshToken = (userId, rememberMe) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: rememberMe ? '7d' : '1d' }
  );
};

// Kullanıcı kayıt fonksiyonu
exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // İlk kullanıcı admin, diğerleri user olacak
    const isFirstUser = (await User.countDocuments({})) === 0;
    const role = isFirstUser ? 'admin' : 'user';

    // Yeni kullanıcı oluştur
    const user = await User.create({ username, email, password, role });

    // Token'ları oluştur
    const accessToken = generateAccessToken(user._id, user.role);
    const refreshToken = generateRefreshToken(user._id, false);

    res.status(201).json({
      success: true,
      accessToken,
      refreshToken,
      data: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      }
    });
  } catch (err) {
    next(err);
  }
};

// Kullanıcı giriş fonksiyonu
exports.login = async (req, res, next) => {
  try {
    const { email, password, rememberMe } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Geçersiz e-posta veya şifre' });
    }

    const accessToken = generateAccessToken(user._id, user.role);
    const refreshToken = generateRefreshToken(user._id, rememberMe);

    res.status(200).json({
      success: true,
      accessToken,
      refreshToken,
      data: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      }
    });
  } catch (err) {
    next(err);
  }
};

// Refresh token ile yeni access token alma fonksiyonu
exports.refreshToken = async (req, res, next) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ message: 'Yenileme token\'ı gerekli' });
  }

  try {
    // Yenileme token'ını doğrula
    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Geçersiz yenileme token\'ı' });
      }

      const user = await User.findById(decoded.id);

      if (!user) {
        return res.status(401).json({ message: 'Geçersiz yenileme token\'ı' });
      }

      // Yeni erişim token'ı oluştur
      const accessToken = generateAccessToken(user._id);

      res.status(200).json({
        success: true,
        accessToken,
      });
    });
  } catch (err) {
    next(err); // Hata olursa errorMiddleware'e aktar
  }
};




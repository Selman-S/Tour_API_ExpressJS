// controllers/authController.js
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// Access token oluşturma fonksiyonu
const generateAccessToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: '15m' } // Erişim token'ı 15 dakika geçerli
  );
};

// Refresh token oluşturma fonksiyonu
const generateRefreshToken = (userId, rememberMe) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: rememberMe ? '7d' : '1d' } // RememberMe varsa 7 gün, yoksa 1 gün geçerli
  );
};

// Kullanıcı kayıt fonksiyonu
exports.register = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    // Yeni kullanıcı oluştur
    const user = await User.create({ username, email, password });

    // Token'ları oluştur
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id, false); // rememberMe false varsayılan

    res.status(201).json({
      success: true,
      accessToken,
      refreshToken,
      data: {
        id: user._id,
        username: user.username,
        email: user.email,
      }
    });
  } catch (err) {
    next(err); // Hata olursa errorMiddleware'e aktar
  }
};

// Kullanıcı giriş fonksiyonu
exports.login = async (req, res, next) => {
  const { email, password, rememberMe } = req.body;

  try {
    // Kullanıcıyı email ile bul
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Geçersiz e-posta veya şifre' });
    }

    // Şifreyi doğrula
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Geçersiz e-posta veya şifre' });
    }

    // Token'ları oluştur
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id, rememberMe);

    res.status(200).json({
      success: true,
      accessToken,
      refreshToken,
      data: {
        id: user._id,
        username: user.username,
        email: user.email,
      }
    });
  } catch (err) {
    next(err); // Hata olursa errorMiddleware'e aktar
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

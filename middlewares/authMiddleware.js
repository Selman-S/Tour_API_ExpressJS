const jwt = require('jsonwebtoken');

// JWT token doğrulama middleware'i
exports.protect = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Erişim izni yok, token gerekli' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Kullanıcıyı isteğe ekle
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Geçersiz veya süresi dolmuş token' });
  }
};

// Admin yetkisini kontrol etme middleware'i
exports.adminProtect = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).json({ message: 'Admin yetkisi gerekli' });
  }
};

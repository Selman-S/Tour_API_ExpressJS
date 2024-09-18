// middlewares/errorMiddleware.js

const errorMiddleware = (err, req, res, next) => {
    console.error(err.stack); // Hatayı konsola logla (opsiyonel)
  
    const statusCode = err.statusCode || 500; // Hata kodu, varsayılan olarak 500
    const message = err.message || 'Sunucu hatası'; // Hata mesajı
  
    res.status(statusCode).json({
      success: false,
      message: message,
      stack: process.env.NODE_ENV === 'production' ? null : err.stack // Üretimde stack'i gizle
    });
  };
  
  module.exports = errorMiddleware;
  
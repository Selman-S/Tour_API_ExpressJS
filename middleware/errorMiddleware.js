function errorMiddleware(err, req, res, next) {
    // Hata detaylarını sunucu konsoluna yazdırın
    console.error(err.stack);
  
    // HTTP durum kodunu ayarlayın (varsa err.statusCode kullanın, yoksa 500)
    const statusCode = err.statusCode || 500;
  
    // Hata mesajını ayarlayın
    const message = err.message || 'Sunucuda bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.';
  
    // Hata yanıtını JSON formatında döndürün
    res.status(statusCode).json({
      success: false,
      message: message,
      cause: err.cause,
    });
  }
  
  module.exports = errorMiddleware;
  

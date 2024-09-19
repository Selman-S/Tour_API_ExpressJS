// app.js
require('express-async-errors'); // express-async-errors paketini import et
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const errorMiddleware = require('./middlewares/errorMiddleware');

// Rotaları yükle
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const tourRoutes = require('./routes/tourRoutes');
// Çevresel değişkenleri yükle
dotenv.config();

// Express uygulamasını oluştur
const app = express();

// Middleware'ler

app.use(require('./middlewares/authenticationMiddleware'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// HTTP isteklerini logla
app.use(morgan('dev'));

// Anasayfa rotası
app.get('/', (req, res) => {
  res.send('Welcome to tour project');
});



// Rotaları kullan
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tours', tourRoutes);
// PORT ayarı

app.use(errorMiddleware);

const PORT = process.env.PORT || 8000;

// Sunucuyu başlat
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor`);
});

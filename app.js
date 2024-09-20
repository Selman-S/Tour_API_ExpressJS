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
const categoryRoutes = require('./routes/categoryRoutes');
const photoRoutes = require('./routes/photoRoutes');
const promotionRoutes = require('./routes/promotionRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const searchSortPageMiddleware = require('./middlewares/searchSortPageMiddleware');


// Çevresel değişkenleri yükle
dotenv.config();

// Express uygulamasını oluştur
const app = express();

// Middleware'ler

app.use(require('./middlewares/authenticationMiddleware'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(searchSortPageMiddleware);
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
app.use('/api/categories', categoryRoutes);
app.use('/api/photos', photoRoutes);
app.use('/api/promotions', promotionRoutes);
app.use('/api/bookings', bookingRoutes);
// PORT ayarı

app.use(errorMiddleware);

const PORT = process.env.PORT || 8000;





// Sunucuyu başlat
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor`);
  
});

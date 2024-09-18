// config/db.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const DB_URI = process.env.DB_URI;

mongoose.connect(DB_URI);

mongoose.connection.on('connected', () => {
  console.log('MongoDB bağlantısı başarılı');
});

mongoose.connection.on('error', (err) => {
  console.error(`MongoDB bağlantı hatası: ${err}`);
});

module.exports = { mongoose };

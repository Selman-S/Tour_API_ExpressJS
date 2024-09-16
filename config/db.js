const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex ve useFindAndModify Mongoose 6'dan itibaren varsayılan olarak true
    });

    console.log(`MongoDB Bağlandı: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Veritabanı bağlantı hatası: ${error.message}`);
    process.exit(1); // Uygulamayı sonlandır
  }
};

module.exports = connectDB;

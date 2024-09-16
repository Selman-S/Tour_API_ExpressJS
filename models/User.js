const mongoose = require('mongoose');
const passwordEncrypt = require('../utils/passwordEncrypt')
const userSchema = new mongoose.Schema({
  name: String,
  surname: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true , set: (password) => passwordEncrypt(password)},
  phone: String,
  dateOfBirth: Date,
  gender: String,
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
}, {
  collection: 'user',
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);

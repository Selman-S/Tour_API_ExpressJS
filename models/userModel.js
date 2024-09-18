// models/userModel.js
const { mongoose } = require('../config/db');
const bcrypt = require('bcryptjs');

// Email doğrulaması için validator paketini kullanacağız
const validator = require('validator');

const UserSchema = new mongoose.Schema({

  username: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    lowercase: true,
    validate: {
      validator: function (v) {
        return validator.isEmail(v);
      },
      message: props => `${props.value} geçerli bir e-posta adresi değil!`
    }
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'agent', 'user'], // Kullanıcı rolleri
    default: 'user', // Varsayılan rol user
  },
  isActive: {
    type: Boolean,
    default: true, // Varsayılan olarak aktif
  }

}, { collection: 'users', timestamps: true });

/* Şifreyi kaydetmeden önce hashle */
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});

/* Şifreyi doğrulama metodu */
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);




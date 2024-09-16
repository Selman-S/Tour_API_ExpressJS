const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
  const { name, surname, email, password } = req.body;

  // Şifreyi hash'le
  const hashedPassword = await bcrypt.hash(password, 12);

  const user = new User({
    name,
    surname,
    email,
    password: hashedPassword
  });

  await user.save();

  // Token oluştur
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1h'
  });

  res.status(201).json({ token });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  // Kullanıcıyı bul
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: 'Geçersiz kimlik bilgileri.' });
  }

  // Şifreyi kontrol et
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Geçersiz kimlik bilgileri.' });
  }

  // Token oluştur
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1h'
  });

  res.status(200).json({ token });
};

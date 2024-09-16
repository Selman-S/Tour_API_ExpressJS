const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { name, surname, email, password } = req.body;



  const user = new User({
    name,
    surname,
    email,
    password
  });
console.log(user);

  await user.save();

  // Token oluştur
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1h'
  });
console.log("token",token);

  res.status(201).json({ token });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  // Kullanıcıyı bul
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: 'Geçersiz kimlik bilgileri.' });
  }

  if (password!=user.password) {
    return res.status(400).json({ message: 'Geçersiz kimlik bilgileri.' });
  }

  // Token oluştur
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1h'
  });

  res.status(200).json({ token });
};

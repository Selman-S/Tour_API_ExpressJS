"use strict"

const jwt = require('jsonwebtoken')


module.exports = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
     
    req.user = decoded;
    next();
  } catch (err) {
    console.log('Geçersiz token.');
    
   next()
  }
};


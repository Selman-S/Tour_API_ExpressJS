// middlewares/permissions.js

module.exports = {

    // Kullanıcının giriş yapıp yapmadığını kontrol eder
    isLogin: (req, res, next) => {
      
    
      if (req.user) {
        next();
      } else {
        res.status(403);
        throw new Error('NoPermission: You must login.');
      }
    },
  
    // Kullanıcının admin olup olmadığını kontrol eder
    isAdmin: (req, res, next) => {
      if (req.user && req.user.role === 'admin') {
        next();
      } else {
        res.status(403);
        throw new Error('NoPermission: Only admin can perform this action.');
      }
    },
  
    // Kullanıcının acenta olup olmadığını kontrol eder
    isAgent: (req, res, next) => {
      if (req.user && req.user.role === 'agent') {
        next();
      } else {
        res.status(403);
        throw new Error('NoPermission: Only agent can perform this action.');
      }
    }
  };
  
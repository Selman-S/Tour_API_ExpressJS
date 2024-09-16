exports.updateUserRole = async (req, res) => {
    const { userId, role } = req.body;
  
    const user = await User.findByIdAndUpdate(userId, { role }, { new: true });
  
    if (!user) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı.' });
    }
  
    res.status(200).json({ message: 'Kullanıcı rolü güncellendi.', user });
  };
  
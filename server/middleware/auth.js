const jwt = require('jsonwebtoken');
const User = require('../models/User');
const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) return res.status(401).json({ message: 'Not authorized, token missing' });
    const decoded = jwt.verify(authHeader.split(' ')[1], process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) return res.status(401).json({ message: 'User not found' });
    next();
  } catch (error) { res.status(401).json({ message: 'Not authorized, token invalid' }); }
};
const adminOnly = (req, res, next) => req.user?.role === 'Admin' ? next() : res.status(403).json({ message: 'Admin access required' });
module.exports = { protect, adminOnly };

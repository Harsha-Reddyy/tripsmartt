import jwt from 'jsonwebtoken';
export const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET || 'dev_secret', { expiresIn: '7d' });

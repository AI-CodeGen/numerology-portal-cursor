import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { CustomJwtPayload, AuthRequest } from '../types/auth';

export const auth = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token is required' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as CustomJwtPayload;
    if (!verified.userId) {
      return res.status(401).json({ message: 'Invalid token format' });
    }
    req.user = verified;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
}; 
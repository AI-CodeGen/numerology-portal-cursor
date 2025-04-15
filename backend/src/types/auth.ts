import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface CustomJwtPayload extends JwtPayload {
  userId: number;
  mobileNumber?: string;
  googleId?: string;
}

export interface AuthRequest extends Request {
  user?: CustomJwtPayload;
} 
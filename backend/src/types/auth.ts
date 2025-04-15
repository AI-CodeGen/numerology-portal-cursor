import { Request } from 'express';

export interface CustomJwtPayload {
  userId: number;
  mobileNumber?: string;
  googleId?: string;
  iat?: number;
  exp?: number;
}

export interface AuthRequest extends Request {
  user?: CustomJwtPayload;
} 
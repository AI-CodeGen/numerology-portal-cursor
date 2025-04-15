import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import { getDatabase } from '../config/database';
import bcrypt from 'bcryptjs';
import { CustomJwtPayload } from '../types/auth';

// Extend Express Request type to include user
declare module 'express' {
  interface Request {
    user?: CustomJwtPayload;
  }
}

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const register = async (req: Request, res: Response) => {
  try {
    const { mobileNumber, password, dateOfBirth, placeOfBirth } = req.body;
    const db = await getDatabase();

    // Validate date of birth format (dd/mm/yyyy)
    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    if (!dateOfBirth || !dateRegex.test(dateOfBirth)) {
      return res.status(400).json({ message: 'Invalid date of birth format. Please use dd/mm/yyyy' });
    }

    // Validate place of birth if provided
    if (placeOfBirth && placeOfBirth.trim().length < 2) {
      return res.status(400).json({ message: 'Place of birth must be at least 2 characters long if provided' });
    }

    // Calculate age
    const [day, month, year] = dateOfBirth.split('/').map(Number);
    const birthDate = new Date(year, month - 1, day);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    // Check if user already exists
    const existingUser = await db.get('SELECT * FROM users WHERE mobile_number = ?', [mobileNumber]);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    const result = await db.run(
      'INSERT INTO users (mobile_number, password, date_of_birth, age, place_of_birth) VALUES (?, ?, ?, ?, ?)',
      [mobileNumber, hashedPassword, dateOfBirth, age, placeOfBirth ? placeOfBirth.trim() : null]
    );

    // Get the created user
    const user = await db.get('SELECT id, mobile_number, date_of_birth, age, place_of_birth, created_at FROM users WHERE id = ?', [result.lastID]);

    // Generate token
    const token = jwt.sign(
      { userId: user.id, mobileNumber: user.mobile_number },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1h' }
    );

    res.status(201).json({ 
      message: 'User registered successfully',
      token,
      user: {
        id: user.id,
        mobileNumber: user.mobile_number,
        dateOfBirth: user.date_of_birth,
        placeOfBirth: user.place_of_birth
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Error registering user' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { mobileNumber, password } = req.body;
    const db = await getDatabase();

    // Find user
    const user = await db.get('SELECT * FROM users WHERE mobile_number = ?', [mobileNumber]);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign(
      { userId: user.id, mobileNumber: user.mobile_number },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1h' }
    );

    res.status(200).json({ 
      token,
      user: {
        id: user.id,
        mobileNumber: user.mobile_number,
        dateOfBirth: user.date_of_birth,
        placeOfBirth: user.place_of_birth
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Error logging in' });
  }
};

export const googleAuth = async (req: Request, res: Response) => {
  try {
    const { token } = req.body;
    const db = await getDatabase();

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) {
      return res.status(401).json({ message: 'Invalid Google token' });
    }

    // Check if user exists with this Google ID
    let user = await db.get('SELECT * FROM users WHERE google_id = ?', [payload.sub]);

    if (!user) {
      // Create new user if doesn't exist
      const result = await db.run(
        'INSERT INTO users (google_id) VALUES (?)',
        [payload.sub]
      );
      user = {
        id: result.lastID,
        google_id: payload.sub
      };
    }

    // Generate token
    const jwtToken = jwt.sign(
      { userId: user.id, googleId: user.google_id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1h' }
    );

    res.status(200).json({ 
      token: jwtToken,
      userId: user.id,
      googleId: user.google_id
    });
  } catch (error) {
    console.error('Google auth error:', error);
    res.status(500).json({ message: 'Error with Google authentication' });
  }
};

// Add new endpoint for updating user profile
export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { dateOfBirth, placeOfBirth } = req.body;
    const userId = (req.user as CustomJwtPayload)?.userId;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const db = await getDatabase();

    // Validate date of birth if provided
    if (dateOfBirth) {
      const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
      if (!dateRegex.test(dateOfBirth)) {
        return res.status(400).json({ message: 'Invalid date of birth format. Please use dd/mm/yyyy' });
      }

      // Calculate age
      const [day, month, year] = dateOfBirth.split('/').map(Number);
      const birthDate = new Date(year, month - 1, day);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      await db.run(
        'UPDATE users SET date_of_birth = ?, age = ? WHERE id = ?',
        [dateOfBirth, age, userId]
      );
    }

    // Validate and update place of birth if provided
    if (placeOfBirth) {
      if (placeOfBirth.trim().length < 2) {
        return res.status(400).json({ message: 'Place of birth must be at least 2 characters long' });
      }

      await db.run(
        'UPDATE users SET place_of_birth = ? WHERE id = ?',
        [placeOfBirth.trim(), userId]
      );
    }

    // Get updated user
    const updatedUser = await db.get(
      'SELECT id, mobile_number, date_of_birth, age, place_of_birth, created_at FROM users WHERE id = ?',
      [userId]
    );

    res.status(200).json({
      message: 'Profile updated successfully',
      user: updatedUser
    });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ message: 'Error updating profile' });
  }
}; 
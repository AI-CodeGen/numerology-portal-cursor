import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import { getDatabase } from '../config/database';
import bcrypt from 'bcryptjs';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const register = async (req: Request, res: Response) => {
  try {
    const { mobileNumber, password } = req.body;
    const db = await getDatabase();

    // Check if user already exists
    const existingUser = await db.get('SELECT * FROM users WHERE mobile_number = ?', [mobileNumber]);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    const result = await db.run(
      'INSERT INTO users (mobile_number, password) VALUES (?, ?)',
      [mobileNumber, hashedPassword]
    );

    res.status(201).json({ 
      message: 'User registered successfully',
      userId: result.lastID 
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
      userId: user.id,
      mobileNumber: user.mobile_number
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
import express from 'express';
import { auth } from '../middleware/auth';
import {
  getMobileNumerology,
  getNameNumerology,
  getVehicleNumerology,
} from '../controllers/numerologyController';

const router = express.Router();

/**
 * @swagger
 * /api/numerology/mobile:
 *   post:
 *     summary: Get mobile number numerology
 *     tags: [Numerology]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mobileNumber:
 *                 type: string
 *     responses:
 *       200:
 *         description: Numerology reading successful
 *       401:
 *         description: Unauthorized
 */
router.post('/mobile', auth, getMobileNumerology);

/**
 * @swagger
 * /api/numerology/name:
 *   post:
 *     summary: Get name numerology
 *     tags: [Numerology]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Numerology reading successful
 *       401:
 *         description: Unauthorized
 */
router.post('/name', auth, getNameNumerology);

/**
 * @swagger
 * /api/numerology/vehicle:
 *   post:
 *     summary: Get vehicle number numerology
 *     tags: [Numerology]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               vehicleNumber:
 *                 type: string
 *     responses:
 *       200:
 *         description: Numerology reading successful
 *       401:
 *         description: Unauthorized
 */
router.post('/vehicle', auth, getVehicleNumerology);

export default router; 
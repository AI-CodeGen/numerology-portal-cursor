const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Numerology API',
      version: '1.0.0',
      description: 'API for numerology calculations',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: 'Development server',
      },
    ],
  },
  apis: ['./server.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * /api/mobile-numerology:
 *   post:
 *     summary: Calculate mobile number numerology
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               number:
 *                 type: string
 *                 description: 10-digit mobile number
 *     responses:
 *       200:
 *         description: Numerology report for mobile number
 */
app.post('/api/mobile-numerology', (req, res) => {
  const { number } = req.body;
  if (!number || number.length !== 10 || !/^\d+$/.test(number)) {
    return res.status(400).json({ error: 'Please provide a valid 10-digit mobile number' });
  }
  
  // Calculate numerology (simplified version)
  const sum = number.split('').reduce((acc, digit) => acc + parseInt(digit), 0);
  const lifePathNumber = sum.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
  
  res.json({
    number,
    lifePathNumber,
    interpretation: `Your mobile number ${number} has a life path number of ${lifePathNumber}. This number suggests...`
  });
});

/**
 * @swagger
 * /api/name-numerology:
 *   post:
 *     summary: Calculate name numerology
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name to analyze (max 50 characters)
 *     responses:
 *       200:
 *         description: Numerology report for name
 */
app.post('/api/name-numerology', (req, res) => {
  const { name } = req.body;
  if (!name || name.length > 50) {
    return res.status(400).json({ error: 'Please provide a valid name (max 50 characters)' });
  }
  
  // Calculate name numerology (simplified version)
  const letterValues = {
    a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9,
    j: 1, k: 2, l: 3, m: 4, n: 5, o: 6, p: 7, q: 8, r: 9,
    s: 1, t: 2, u: 3, v: 4, w: 5, x: 6, y: 7, z: 8
  };
  
  const sum = name.toLowerCase().split('').reduce((acc, char) => {
    return acc + (letterValues[char] || 0);
  }, 0);
  
  const destinyNumber = sum.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
  
  res.json({
    name,
    destinyNumber,
    interpretation: `Your name "${name}" has a destiny number of ${destinyNumber}. This number indicates...`
  });
});

/**
 * @swagger
 * /api/vehicle-numerology:
 *   post:
 *     summary: Calculate vehicle number numerology
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               number:
 *                 type: string
 *                 description: Vehicle number (max 12 alphanumeric characters)
 *     responses:
 *       200:
 *         description: Numerology report for vehicle number
 */
app.post('/api/vehicle-numerology', (req, res) => {
  const { number } = req.body;
  if (!number || number.length > 12) {
    return res.status(400).json({ error: 'Please provide a valid vehicle number (max 12 characters)' });
  }
  
  // Calculate vehicle numerology (simplified version)
  const sum = number.toLowerCase().split('').reduce((acc, char) => {
    if (/[a-z]/.test(char)) {
      return acc + (char.charCodeAt(0) - 96);
    } else if (/[0-9]/.test(char)) {
      return acc + parseInt(char);
    }
    return acc;
  }, 0);
  
  const vehicleNumber = sum.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
  
  res.json({
    number,
    vehicleNumber,
    interpretation: `Your vehicle number ${number} has a numerology value of ${vehicleNumber}. This suggests...`
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 
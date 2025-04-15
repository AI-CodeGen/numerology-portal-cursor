import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Numerology Portal API',
      version: '1.0.0',
      description: 'API documentation for the Numerology Portal application',
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'User ID',
            },
            mobile_number: {
              type: 'string',
              description: 'User mobile number',
            },
            google_id: {
              type: 'string',
              description: 'Google OAuth ID',
            },
          },
        },
        NumerologyResponse: {
          type: 'object',
          properties: {
            number: {
              type: 'string',
              description: 'Calculated numerology number',
            },
            meaning: {
              type: 'string',
              description: 'Meaning of the number',
            },
            prediction: {
              type: 'string',
              description: 'Prediction based on the number',
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              description: 'Error message',
            },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.ts'],
};

export const specs = swaggerJsdoc(options); 
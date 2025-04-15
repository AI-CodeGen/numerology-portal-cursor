# Numerology Portal

A full-stack application for numerology calculations including mobile number, name, and vehicle number numerology.

## Features

- Mobile Number Numerology with wine-themed UI
- Name Numerology with blue-themed UI
- Vehicle Number Numerology with green-themed UI
- Beautiful and responsive design
- Swagger API documentation

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd numerology-portal
```

2. Install backend dependencies:
```bash
npm install
```

3. Install frontend dependencies:
```bash
cd frontend
npm install
```

## Running the Application

1. Start the backend server:
```bash
# From the root directory
npm start
```

2. Start the frontend development server:
```bash
# From the frontend directory
cd frontend
npm start
```

3. Access the application:
- Frontend: http://localhost:3000
- API Documentation: http://localhost:5000/api-docs

## API Endpoints

- POST /api/mobile-numerology - Calculate mobile number numerology
- POST /api/name-numerology - Calculate name numerology
- POST /api/vehicle-numerology - Calculate vehicle number numerology

## Technologies Used

- Frontend:
  - React
  - Material-UI
  - React Router
  - Axios

- Backend:
  - Node.js
  - Express
  - Swagger UI Express
  - CORS 
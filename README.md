# Numerology Portal

A full-stack numerology application that provides readings for mobile numbers, names, and vehicle numbers. Built with React, Node.js, Express, and SQLite.

## Features

- Mobile Number Numerology
- Name Numerology
- Vehicle Number Numerology
- User Authentication (Mobile Number & Google OAuth)
- Dark Mode Support
- Responsive Design
- Secure Data Storage

## Tech Stack

### Frontend
- React
- TypeScript
- Tailwind CSS
- React Router
- Google OAuth

### Backend
- Node.js
- Express
- SQLite
- JWT Authentication
- Swagger Documentation

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/AI-CodeGen/numerology-portal-cursor.git
cd numerology-portal-cursor
```

2. Install frontend dependencies:
```bash
cd frontend
npm install
```

3. Install backend dependencies:
```bash
cd ../backend
npm install
```

4. Create a `.env` file in the backend directory:
```env
PORT=5000
JWT_SECRET=your-secret-key
GOOGLE_CLIENT_ID=your-google-client-id
```

5. Start the backend server:
```bash
cd backend
npm run dev
```

6. Start the frontend development server:
```bash
cd frontend
npm start
```

The application will be available at `http://localhost:3000`

## API Documentation

The API documentation is available at `http://localhost:5000/api-docs` when the backend server is running.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 
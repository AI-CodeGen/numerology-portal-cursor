# Numerology Portal Backend

The backend server for the Numerology Portal application.

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login with mobile number and password
- `POST /api/auth/google` - Login with Google OAuth

### Numerology

- `POST /api/numerology/mobile` - Get mobile number numerology reading
- `POST /api/numerology/name` - Get name numerology reading
- `POST /api/numerology/vehicle` - Get vehicle number numerology reading

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  mobile_number TEXT UNIQUE,
  password TEXT,
  google_id TEXT UNIQUE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Predictions Table
```sql
CREATE TABLE predictions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  type TEXT,
  input_value TEXT,
  prediction TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users (id)
);
```

## Environment Variables

Create a `.env` file with the following variables:

```env
PORT=5000
JWT_SECRET=your-secret-key
GOOGLE_CLIENT_ID=your-google-client-id
```

## Development

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

## API Documentation

Swagger documentation is available at `http://localhost:5000/api-docs` 
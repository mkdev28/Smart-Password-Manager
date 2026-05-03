require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db/connect');
const authRoutes = require('./routes/authRoutes');
const passwordRoutes = require('./routes/passwordRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  process.env.CLIENT_URL
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV === 'production') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/passwords', passwordRoutes);

app.get('/api/health', (req, res) => res.json({ status: 'ok', timestamp: new Date() }));

// In serverless environments, Vercel will call the exported app.
// For local development, we still want to start the server.
if (process.env.NODE_ENV !== 'production') {
  connectDB()
    .then(() => {
      app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((err) => {
      console.error('DB connection failed. Server NOT started.', err);
      process.exit(1);
    });
}

module.exports = app;
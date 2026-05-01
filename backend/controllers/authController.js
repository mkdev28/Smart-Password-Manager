const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const connectDB = require('../db/connect');

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Validation
    if (!username || username.length < 3 || username.length > 20 || !/^[a-zA-Z0-9]+$/.test(username)) {
      return res.status(400).json({ error: 'Username must be 3-20 alphanumeric characters.' });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format.' });
    }
    if (!password || password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters.' });
    }

    const db = await connectDB();
    const usersCollection = db.collection('users');

    // Check existing
    const existingEmail = await usersCollection.findOne({ email: email.toLowerCase().trim() });
    if (existingEmail) return res.status(409).json({ error: 'Email already registered.' });

    const existingUsername = await usersCollection.findOne({ username: username.toLowerCase().trim() });
    if (existingUsername) return res.status(409).json({ error: 'Username already taken.' });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    await usersCollection.insertOne({
      username: username.toLowerCase().trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      createdAt: new Date()
    });

    res.status(201).json({ message: 'Account created successfully.' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const db = await connectDB();
    const usersCollection = db.collection('users');

    const user = await usersCollection.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      token,
      user: {
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

module.exports = { register, login };

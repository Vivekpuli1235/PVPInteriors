require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const admin = require('./firebase-config');

const app = express();

const Review = require('./models/Review');
const Contact = require('./models/Contact');

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/pvpinteriors';

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB successfully connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// --- API ROUTES ---

// 1. Submit a Review
app.post('/api/reviews', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !message) return res.status(400).json({ error: "Name and message are required" });

    const newReview = new Review({ name, email, message });
    await newReview.save();
    res.status(201).json({ success: true, review: newReview });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error saving review" });
  }
});

// 2. Get all Reviews
app.get('/api/reviews', async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error fetching reviews" });
  }
});

// 3. Submit a Contact Form
app.post('/api/contacts', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) return res.status(400).json({ error: "Name, email and message are required" });

    const newContact = new Contact({ name, email, message });
    await newContact.save();
    res.status(201).json({ success: true, contact: newContact });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error saving contact info" });
  }
});

// Middleware to authenticate Firebase ID Token for protected routes
const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Error verifying Firebase token:', error);
    return res.sendStatus(403);
  }
};

// 5. Get all Contacts (Protected)
app.get('/api/contacts', authenticateToken, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error fetching contacts" });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

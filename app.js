const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("Mongo error:", err));


// Import the Contact model
const Contact = require('./models/contact');  // Import schema

// Routes
app.get('/', (req, res) => {
  res.render('index');  // Rendering index page
});

// Handle contact form submission
app.post('/contact', async (req, res) => {
  try {
    const { name, email, company, message } = req.body;

    // Create a new contact document based on the form data
    const newContact = new Contact({
      name,
      email,
      company,
      message
    });

    // Save the contact to MongoDB
    await newContact.save();

    // Respond with a success message
    res.json({ success: true, message: 'Thank you for your message! We will get back to you shortly.' });
  } catch (error) {
    console.error('Error saving contact:', error);
    res.status(500).json({ success: false, message: 'Something went wrong. Please try again later.' });
  }
});

// Admin route to view contacts (for testing or monitoring)
app.get('/admin/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.render('admin', { contacts });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).send('Error fetching contacts');
  }
});

module.exports = app;

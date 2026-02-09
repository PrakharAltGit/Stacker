const express = require('express');
const router = express.Router();
const Contact = require('../models/contact'); // Import the Contact model

// POST route to handle contact form submission
router.post('/contact', async (req, res) => {
  try {
    const { name, email, company, message } = req.body;

    // Create a new Contact entry
    const newContact = new Contact({
      name,
      email,
      company,
      message
    });

    // Save the contact entry to MongoDB
    await newContact.save();

    res.status(200).json({ message: 'Your message has been received. We will contact you shortly.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'There was an error with your submission. Please try again later.' });
  }
});

module.exports = router;

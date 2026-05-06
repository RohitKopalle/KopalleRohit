const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// POST /api/contact — receives contact form submissions
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email address' });
    }

    // Log the contact form submission (in production, you'd send an email or store in DB)
    console.log('📬 New contact form submission:');
    console.log(`   Name: ${name}`);
    console.log(`   Email: ${email}`);
    console.log(`   Message: ${message}`);

    // Save message to MongoDB
    const newMessage = new Message({
      name,
      email,
      message
    });
    
    await newMessage.save();
    console.log('✅ Message saved to MongoDB successfully!');

    res.json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error processing contact form:', error.message);
    res.status(500).json({ message: 'Server error processing your message' });
  }
});

module.exports = router;

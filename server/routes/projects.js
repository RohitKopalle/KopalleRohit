const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// GET /api/projects — returns all projects sorted by newest first
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error.message);
    res.status(500).json({ message: 'Server error fetching projects' });
  }
});

module.exports = router;

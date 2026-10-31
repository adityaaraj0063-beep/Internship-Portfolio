require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { dbOps } = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend static files from the root directory
app.use(express.static(path.join(__dirname)));

// API Routes

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    database: 'SQLite (Connected)'
  });
});

// GET /api/projects - Retrieve projects (optional category filter)
app.get('/api/projects', async (req, res) => {
  try {
    const { category } = req.query;
    const projects = await dbOps.getProjects(category);
    res.json({
      success: true,
      count: projects.length,
      data: projects
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ success: false, message: 'Server error while fetching projects' });
  }
});

// GET /api/projects/:id - Retrieve single project
app.get('/api/projects/:id', async (req, res) => {
  try {
    const project = await dbOps.getProjectById(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    res.json({ success: true, data: project });
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({ success: false, message: 'Server error while fetching project' });
  }
});

// POST /api/projects - Add new project
app.post('/api/projects', async (req, res) => {
  try {
    const { title, category, description, image, tags, liveUrl, githubUrl, featured } = req.body;
    if (!title || !description) {
      return res.status(400).json({ success: false, message: 'Title and description are required' });
    }
    const newProject = await dbOps.createProject({
      title,
      category: category || 'Full Stack',
      description,
      image,
      tags: tags || [],
      liveUrl: liveUrl || '#',
      githubUrl: githubUrl || '#',
      featured: featured ? 1 : 0
    });
    res.status(201).json({ success: true, message: 'Project created successfully', data: newProject });
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ success: false, message: 'Server error while creating project' });
  }
});

// GET /api/skills - Retrieve skills
app.get('/api/skills', async (req, res) => {
  try {
    const skills = await dbOps.getSkills();
    // Group skills by category
    const grouped = skills.reduce((acc, skill) => {
      acc[skill.category] = acc[skill.category] || [];
      acc[skill.category].push(skill);
      return acc;
    }, {});
    res.json({
      success: true,
      data: grouped,
      all: skills
    });
  } catch (error) {
    console.error('Error fetching skills:', error);
    res.status(500).json({ success: false, message: 'Server error while fetching skills' });
  }
});

// POST /api/contact - Handle contact form submission
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required fields.'
      });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.'
      });
    }

    const savedMessage = await dbOps.saveContactMessage({
      name,
      email,
      subject: subject || 'Portfolio Contact Submission',
      message
    });

    res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been received successfully.',
      data: savedMessage
    });
  } catch (error) {
    console.error('Error saving contact message:', error);
    res.status(500).json({ success: false, message: 'Failed to send message. Please try again.' });
  }
});

// GET /api/messages - View received messages
app.get('/api/messages', async (req, res) => {
  try {
    const messages = await dbOps.getContactMessages();
    res.json({ success: true, count: messages.length, data: messages });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ success: false, message: 'Server error while fetching messages' });
  }
});

// Fallback to index.html for any frontend SPA navigation
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`===============================================`);
  console.log(`🚀 Portfolio Server running at http://localhost:${PORT}`);
  console.log(`📡 API Endpoints available at http://localhost:${PORT}/api/projects`);
  console.log(`💾 Database: SQLite / Cloud DB Ready`);
  console.log(`===============================================`);
});

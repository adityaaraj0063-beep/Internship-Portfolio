const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

// Ensure data directory exists for SQLite
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'portfolio.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening SQLite database:', err.message);
  } else {
    console.log('Connected to local SQLite database at:', dbPath);
    initializeDatabase();
  }
});

// Seed data
const initialProjects = [
  {
    title: 'DevPulse - Full-Stack Developer Platform',
    category: 'Full Stack',
    description: 'A modern developer community hub with real-time discussions, code snippet sharing, markdown blogging, and user authentication.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    tags: JSON.stringify(['Node.js', 'Express', 'JavaScript', 'SQLite', 'REST API']),
    liveUrl: 'https://example.com/devpulse',
    githubUrl: 'https://github.com/adityaaraaj0063/devpulse',
    featured: 1
  },
  {
    title: 'ShopFlow - E-Commerce Engine',
    category: 'Full Stack',
    description: 'Scalable e-commerce web platform featuring dynamic product filtering, shopping cart state management, checkout flow, and admin dashboard.',
    image: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=800&q=80',
    tags: JSON.stringify(['Node.js', 'Express', 'MongoDB / SQL', 'JavaScript', 'CSS3']),
    liveUrl: 'https://example.com/shopflow',
    githubUrl: 'https://github.com/adityaaraaj0063/shopflow',
    featured: 1
  },
  {
    title: 'TaskMaster AI - Smart Productivity Suite',
    category: 'AI & Automation',
    description: 'AI-assisted task management application with automated priority ranking, Kanban drag-and-drop boards, and smart deadline notifications.',
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=800&q=80',
    tags: JSON.stringify(['JavaScript', 'Node.js', 'REST API', 'CSS Grid', 'AI API']),
    liveUrl: 'https://example.com/taskmaster',
    githubUrl: 'https://github.com/adityaaraaj0063/taskmaster-ai',
    featured: 1
  },
  {
    title: 'CipherCloud - Secure File Vault',
    category: 'Backend',
    description: 'Cloud storage and asset manager featuring encrypted file uploads, presigned URLs, role-based access control, and storage quotas.',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80',
    tags: JSON.stringify(['Node.js', 'Express', 'Security', 'JWT', 'SQLite']),
    liveUrl: 'https://example.com/ciphercloud',
    githubUrl: 'https://github.com/adityaaraaj0063/ciphercloud',
    featured: 0
  },
  {
    title: 'CryptoScope - Live Financial Analytics',
    category: 'Frontend',
    description: 'High-performance cryptocurrency tracking dashboard with live candlestick charts, currency converter, market sentiment, and watchlist.',
    image: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=800&q=80',
    tags: JSON.stringify(['JavaScript ES6+', 'Chart.js', 'HTML5', 'Glassmorphism CSS']),
    liveUrl: 'https://example.com/cryptoscope',
    githubUrl: 'https://github.com/adityaaraaj0063/cryptoscope',
    featured: 0
  },
  {
    title: 'CodeSprint - Real-Time Collaborative IDE',
    category: 'Full Stack',
    description: 'Browser-based interactive coding playground with multi-tab file management, syntax highlighting, and live code preview execution.',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80',
    tags: JSON.stringify(['Node.js', 'WebSockets', 'HTML/CSS/JS', 'REST API']),
    liveUrl: 'https://example.com/codesprint',
    githubUrl: 'https://github.com/adityaaraaj0063/codesprint',
    featured: 0
  }
];

const initialSkills = [
  { name: 'HTML5 / Semantic Web', category: 'Frontend', level: 95, icon: 'fab fa-html5' },
  { name: 'CSS3 / Modern Layouts (Grid/Flexbox)', category: 'Frontend', level: 92, icon: 'fab fa-css3-alt' },
  { name: 'JavaScript (ES6+ / Modern JS)', category: 'Frontend', level: 90, icon: 'fab fa-js-square' },
  { name: 'React.js', category: 'Frontend', level: 85, icon: 'fab fa-react' },
  { name: 'Node.js', category: 'Backend', level: 88, icon: 'fab fa-node-js' },
  { name: 'Express.js & REST APIs', category: 'Backend', level: 90, icon: 'fas fa-server' },
  { name: 'SQLite / MySQL / PostgreSQL', category: 'Database', level: 85, icon: 'fas fa-database' },
  { name: 'MongoDB & Mongoose', category: 'Database', level: 82, icon: 'fas fa-leaf' },
  { name: 'Git & GitHub Workflow', category: 'DevOps & Tools', level: 90, icon: 'fab fa-github' },
  { name: 'Vercel / Netlify / Render Deployment', category: 'DevOps & Tools', level: 88, icon: 'fas fa-cloud-upload-alt' },
  { name: 'Postman & API Testing', category: 'DevOps & Tools', level: 86, icon: 'fas fa-vial' },
  { name: 'Responsive Web Design', category: 'Frontend', level: 94, icon: 'fas fa-mobile-alt' }
];

function initializeDatabase() {
  db.serialize(() => {
    // Projects table
    db.run(`
      CREATE TABLE IF NOT EXISTS projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        category TEXT NOT NULL,
        description TEXT NOT NULL,
        image TEXT,
        tags TEXT,
        liveUrl TEXT,
        githubUrl TEXT,
        featured INTEGER DEFAULT 0,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Skills table
    db.run(`
      CREATE TABLE IF NOT EXISTS skills (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        category TEXT NOT NULL,
        level INTEGER DEFAULT 80,
        icon TEXT
      )
    `);

    // Contact messages table
    db.run(`
      CREATE TABLE IF NOT EXISTS contact_messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        subject TEXT,
        message TEXT NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Seed projects if empty
    db.get('SELECT COUNT(*) as count FROM projects', (err, row) => {
      if (err) {
        console.error('Error counting projects:', err);
        return;
      }
      if (row.count === 0) {
        console.log('Seeding initial projects to database...');
        const stmt = db.prepare(`
          INSERT INTO projects (title, category, description, image, tags, liveUrl, githubUrl, featured)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `);
        initialProjects.forEach((proj) => {
          stmt.run(
            proj.title,
            proj.category,
            proj.description,
            proj.image,
            proj.tags,
            proj.liveUrl,
            proj.githubUrl,
            proj.featured
          );
        });
        stmt.finalize();
        console.log('Projects seeded successfully.');
      }
    });

    // Seed skills if empty
    db.get('SELECT COUNT(*) as count FROM skills', (err, row) => {
      if (err) {
        console.error('Error counting skills:', err);
        return;
      }
      if (row.count === 0) {
        console.log('Seeding initial skills to database...');
        const stmt = db.prepare(`
          INSERT INTO skills (name, category, level, icon)
          VALUES (?, ?, ?, ?)
        `);
        initialSkills.forEach((skill) => {
          stmt.run(skill.name, skill.category, skill.level, skill.icon);
        });
        stmt.finalize();
        console.log('Skills seeded successfully.');
      }
    });
  });
}

// Database helper functions (Promise-based)
const dbOps = {
  getProjects: (category) => {
    return new Promise((resolve, reject) => {
      let query = 'SELECT * FROM projects ORDER BY featured DESC, id ASC';
      let params = [];
      if (category && category !== 'All') {
        query = 'SELECT * FROM projects WHERE category = ? ORDER BY featured DESC, id ASC';
        params = [category];
      }
      db.all(query, params, (err, rows) => {
        if (err) return reject(err);
        const parsed = rows.map((r) => ({
          ...r,
          tags: r.tags ? JSON.parse(r.tags) : []
        }));
        resolve(parsed);
      });
    });
  },

  getProjectById: (id) => {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM projects WHERE id = ?', [id], (err, row) => {
        if (err) return reject(err);
        if (!row) return resolve(null);
        resolve({
          ...row,
          tags: row.tags ? JSON.parse(row.tags) : []
        });
      });
    });
  },

  createProject: (proj) => {
    return new Promise((resolve, reject) => {
      const stmt = db.prepare(`
        INSERT INTO projects (title, category, description, image, tags, liveUrl, githubUrl, featured)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `);
      const tagsStr = Array.isArray(proj.tags) ? JSON.stringify(proj.tags) : proj.tags || '[]';
      stmt.run(
        proj.title,
        proj.category || 'Full Stack',
        proj.description,
        proj.image || '',
        tagsStr,
        proj.liveUrl || '#',
        proj.githubUrl || '#',
        proj.featured ? 1 : 0,
        function (err) {
          if (err) return reject(err);
          resolve({ id: this.lastID, ...proj });
        }
      );
      stmt.finalize();
    });
  },

  getSkills: () => {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM skills ORDER BY category ASC, level DESC', [], (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  },

  saveContactMessage: (msg) => {
    return new Promise((resolve, reject) => {
      const stmt = db.prepare(`
        INSERT INTO contact_messages (name, email, subject, message)
        VALUES (?, ?, ?, ?)
      `);
      stmt.run(msg.name, msg.email, msg.subject || 'General Inquiry', msg.message, function (err) {
        if (err) return reject(err);
        resolve({ id: this.lastID, ...msg, createdAt: new Date() });
      });
      stmt.finalize();
    });
  },

  getContactMessages: () => {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM contact_messages ORDER BY createdAt DESC', [], (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  }
};

module.exports = {
  db,
  dbOps
};

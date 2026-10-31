# 🌟 Full-Stack Personal Portfolio Website
### Thiranex Skill Development & Future Tech — Internship Task 1

[![License: MIT](https://img.shields.io/badge/License-MIT-indigo.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-v24.x-68a063.svg?logo=node.js)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-v4.x-000000.svg?logo=express)](https://expressjs.com/)
[![SQLite](https://img.shields.io/badge/Database-SQLite%20%2F%20MongoDB-003b57.svg?logo=sqlite)](https://www.sqlite.org/)
[![Frontend](https://img.shields.io/badge/Frontend-HTML5%20%7C%20CSS3%20%7C%20JS%20ES6+-f7df1e.svg)](https://developer.mozilla.org/)

---

## 📌 Project Overview

This is a complete, industry-standard **Full-Stack Personal Portfolio Website** built for the **Thiranex Internship (Task 1: Personal Portfolio Website)** by **Aditya Raj**.

The application demonstrates seamless integration across all three layers of modern web engineering:
1. **Frontend**: Clean, responsive, semantic HTML5, modern CSS3 (with CSS variables, glassmorphism, responsive grid/flexbox, dark/light mode toggle), and interactive JavaScript (ES6+).
2. **Backend**: RESTful API server built with **Node.js** and **Express.js**, supporting dynamic project querying, skill data retrieval, and contact form submission.
3. **Database**: Persistent storage of project details and user contact messages using **SQLite** (with out-of-the-box zero config setup) and ready-to-connect **MongoDB** schema support.

---

## 🚀 Key Features

| Requirement | Implementation Details |
|---|---|
| **Frontend** | Semantic **HTML5**, modern **CSS3** with dark/light mode, glassmorphic UI, responsive layouts, and modern **JavaScript (ES6+)**. |
| **Backend** | Robust **Node.js** & **Express.js** REST API with CORS, input validation, and static asset serving. |
| **Database** | Persistent database storage for projects, skills, and contact messages using **SQLite** with automated seeding & **MongoDB** support. |
| **Interactive Features** | Dynamic project filter by category, typewriter animation, interactive project preview modal, live "Add Project" database test, theme switcher, and contact form with live toast feedback. |
| **Deployment Ready** | Preconfigured for **Vercel**, **Netlify**, **Render**, or **GitHub Pages**. |

---

## 📂 Repository Structure

```
Portfolio 1/
│
├── index.html            # Main portfolio webpage (Semantic HTML5)
├── style.css             # Complete design system & responsive styling
├── script.js             # Client-side JavaScript (API calls, UI, animations)
├── server.js             # Node.js & Express REST API server
├── db.js                 # Database configuration, schema & automatic seeding
├── package.json          # Node dependencies and project scripts
├── .env.example          # Environment variables template
├── .gitignore            # Git exclusion rules
├── README.md             # Comprehensive project documentation
│
└── assets/               # Image assets and project media
    └── avatar.jpg        # Profile portrait
```

---

## 🛠️ Tech Stack

- **Client**: HTML5, CSS3 (Custom Properties, Flexbox, Grid), JavaScript (Vanilla ES6+), FontAwesome Icons, Google Fonts
- **Server**: Node.js, Express.js, CORS, Dotenv
- **Database**: SQLite3 (Local SQL Engine) & MongoDB / Mongoose support
- **Hosting Targets**: Vercel, Render, Netlify, Heroku

---

## 🔌 Backend REST API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Health status and database connection check |
| `GET` | `/api/projects` | Retrieve all projects from the database |
| `GET` | `/api/projects?category=Full Stack` | Filter projects by category |
| `GET` | `/api/projects/:id` | Fetch details of a single project |
| `POST` | `/api/projects` | Add a new project to the database |
| `GET` | `/api/skills` | Retrieve technical skills categorized |
| `POST` | `/api/contact` | Validate and store contact messages in the database |
| `GET` | `/api/messages` | View all submitted messages |

---

## 💻 Local Setup & Execution Guide

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) (v16 or higher) installed on your system.

### 2. Clone the Repository
```bash
git clone https://github.com/adityaaraaj0063/portfolio.git
cd portfolio
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Start the Full-Stack Application
```bash
npm start
```

Open your browser and navigate to:
```
http://localhost:5000
```

> **Note**: On first startup, the database `data/portfolio.db` is automatically created and seeded with real project data!

---

## 🌐 Deployment Instructions

### Deploy to Render / Railway / Heroku (Full Stack)
1. Push this repository to your GitHub account.
2. Sign in to [Render](https://render.com/).
3. Click **New +** -> **Web Service**.
4. Connect your GitHub repository.
5. Set:
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
6. Click **Deploy Web Service**.

### Deploy Frontend to Vercel / Netlify
1. Connect your GitHub repository to [Vercel](https://vercel.com) or [Netlify](https://netlify.com).
2. Set root directory as `./` and deploy.
3. The frontend is fully compatible and automatically falls back to pre-packaged data if the backend is hosted separately.

---

## 📸 Submission Checklist for Thiranex Internship

According to the instructions for **STEP 11**:
1. [x] **GitHub Repository**: Upload files (`index.html`, `style.css`, `script.js`, `server.js`, `db.js`, `README.md`) and take a screenshot of the root directory.
2. [x] **Live Website**: Deploy the portfolio or run it locally, and take screenshots of:
   - Hero Section & Navigation
   - About & Skills Section
   - Dynamic Projects Section (showing database data)
   - Working Contact Form (with success message)
3. [x] **Google Drive Folder**: Create folder titled:
   `Thiranex Internship - Portfolio Project`
4. [x] Upload screenshots to the Google Drive folder.
5. [x] Submit the **Live Portfolio URL** and **GitHub Repository URL** on the Thiranex student dashboard!

---

## 👤 Author
**Aditya Raj**  
- **GitHub**: [@adityaaraaj0063](https://github.com/adityaaraaj0063)  
- **Email**: [adityaaraaj0063@gmail.com](mailto:adityaaraaj0063@gmail.com)  
- **Internship**: Full-Stack Web Development @ [Thiranex](https://thiranex.in)

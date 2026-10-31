/**
 * ADITYA RAJ - FULL-STACK PORTFOLIO CLIENT ENGINE
 * Thiranex Internship Project - Task 1: Personal Portfolio Website
 */

// Base API configuration (works both in local dev & cloud deployment)
const API_BASE_URL = window.location.origin.includes('http') && !window.location.origin.startsWith('file:')
  ? window.location.origin
  : 'http://localhost:5000';

// Embedded fallback data in case the page is viewed as a static file without the server running
const FALLBACK_PROJECTS = [
  {
    id: 1,
    title: 'DevPulse - Full-Stack Developer Platform',
    category: 'Full Stack',
    description: 'A modern developer community hub with real-time discussions, code snippet sharing, markdown blogging, and user authentication.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    tags: ['Node.js', 'Express', 'JavaScript', 'SQLite', 'REST API'],
    liveUrl: 'https://example.com/devpulse',
    githubUrl: 'https://github.com/adityaaraaj0063/devpulse',
    featured: 1
  },
  {
    id: 2,
    title: 'ShopFlow - E-Commerce Engine',
    category: 'Full Stack',
    description: 'Scalable e-commerce web platform featuring dynamic product filtering, shopping cart state management, checkout flow, and admin dashboard.',
    image: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=800&q=80',
    tags: ['Node.js', 'Express', 'MongoDB / SQL', 'JavaScript', 'CSS3'],
    liveUrl: 'https://example.com/shopflow',
    githubUrl: 'https://github.com/adityaaraaj0063/shopflow',
    featured: 1
  },
  {
    id: 3,
    title: 'TaskMaster AI - Smart Productivity Suite',
    category: 'AI & Automation',
    description: 'AI-assisted task management application with automated priority ranking, Kanban drag-and-drop boards, and smart deadline notifications.',
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=800&q=80',
    tags: ['JavaScript', 'Node.js', 'REST API', 'CSS Grid', 'AI API'],
    liveUrl: 'https://example.com/taskmaster',
    githubUrl: 'https://github.com/adityaaraaj0063/taskmaster-ai',
    featured: 1
  },
  {
    id: 4,
    title: 'CipherCloud - Secure File Vault',
    category: 'Backend',
    description: 'Cloud storage and asset manager featuring encrypted file uploads, presigned URLs, role-based access control, and storage quotas.',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80',
    tags: ['Node.js', 'Express', 'Security', 'JWT', 'SQLite'],
    liveUrl: 'https://example.com/ciphercloud',
    githubUrl: 'https://github.com/adityaaraaj0063/ciphercloud',
    featured: 0
  },
  {
    id: 5,
    title: 'CryptoScope - Live Financial Analytics',
    category: 'Frontend',
    description: 'High-performance cryptocurrency tracking dashboard with live candlestick charts, currency converter, market sentiment, and watchlist.',
    image: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=800&q=80',
    tags: ['JavaScript ES6+', 'Chart.js', 'HTML5', 'Glassmorphism CSS'],
    liveUrl: 'https://example.com/cryptoscope',
    githubUrl: 'https://github.com/adityaaraaj0063/cryptoscope',
    featured: 0
  },
  {
    id: 6,
    title: 'CodeSprint - Real-Time Collaborative IDE',
    category: 'Full Stack',
    description: 'Browser-based interactive coding playground with multi-tab file management, syntax highlighting, and live code preview execution.',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80',
    tags: ['Node.js', 'WebSockets', 'HTML/CSS/JS', 'REST API'],
    liveUrl: 'https://example.com/codesprint',
    githubUrl: 'https://github.com/adityaaraaj0063/codesprint',
    featured: 0
  }
];

const FALLBACK_SKILLS = [
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

// App State
let projectsData = [];
let skillsData = [];
let currentProjectFilter = 'All';
let currentSkillFilter = 'All';

// DOM Ready initialization
document.addEventListener('DOMContentLoaded', () => {
  initTypewriter();
  initThemeToggle();
  initMobileMenu();
  initScrollSpy();
  initBackToTop();
  initContactForm();
  initModals();
  checkApiHealth();
  loadSkills();
  loadProjects();

  // Set footer copyright year
  const yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

/* -------------------------------------------------------------
   1. Typewriter Animation Effect
   ------------------------------------------------------------- */
function initTypewriter() {
  const words = [
    'Full-Stack Applications',
    'Node.js & Express REST APIs',
    'Database Driven Systems',
    'Interactive Web Experiences'
  ];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const targetEl = document.getElementById('typewriter-text');
  if (!targetEl) return;

  function type() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
      targetEl.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      targetEl.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentWord.length) {
      typeSpeed = 2000; // Pause at full word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typeSpeed = 400; // Pause before typing next word
    }

    setTimeout(type, typeSpeed);
  }

  type();
}

/* -------------------------------------------------------------
   2. Theme Switcher (Dark / Light Mode)
   ------------------------------------------------------------- */
function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle-btn');
  const htmlTag = document.documentElement;

  // Retrieve saved theme or default to dark
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  htmlTag.setAttribute('data-theme', savedTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const current = htmlTag.getAttribute('data-theme');
      const nextTheme = current === 'dark' ? 'light' : 'dark';
      htmlTag.setAttribute('data-theme', nextTheme);
      localStorage.setItem('portfolio-theme', nextTheme);
      showToast(`Switched to ${nextTheme} mode`, 'success');
    });
  }
}

/* -------------------------------------------------------------
   3. Mobile Navigation Drawer
   ------------------------------------------------------------- */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-toggle-btn');
  const drawer = document.getElementById('mobile-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link, #mob-cta');

  if (!toggleBtn || !drawer) return;

  toggleBtn.addEventListener('click', () => {
    drawer.classList.toggle('open');
  });

  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => {
      drawer.classList.remove('open');
    });
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!drawer.contains(e.target) && !toggleBtn.contains(e.target) && drawer.classList.contains('open')) {
      drawer.classList.remove('open');
    }
  });
}

/* -------------------------------------------------------------
   4. Scroll Spy & Navbar Highlight
   ------------------------------------------------------------- */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let currentSectionId = '';
    const scrollY = window.pageYOffset;

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });
}

/* -------------------------------------------------------------
   5. Back to Top Button
   ------------------------------------------------------------- */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* -------------------------------------------------------------
   6. Check Backend API Health
   ------------------------------------------------------------- */
async function checkApiHealth() {
  const statusMetric = document.getElementById('api-status-metric');
  try {
    const res = await fetch(`${API_BASE_URL}/api/health`);
    if (res.ok) {
      const data = await res.json();
      if (statusMetric) {
        statusMetric.textContent = 'Live SQLite';
        statusMetric.style.color = '#10b981';
      }
    }
  } catch (err) {
    if (statusMetric) {
      statusMetric.textContent = 'Active (Local)';
    }
  }
}

/* -------------------------------------------------------------
   7. Skills Section Engine
   ------------------------------------------------------------- */
async function loadSkills() {
  const skillsContainer = document.getElementById('skills-grid');
  if (!skillsContainer) return;

  try {
    const res = await fetch(`${API_BASE_URL}/api/skills`);
    if (res.ok) {
      const json = await res.json();
      skillsData = json.all || json.data || FALLBACK_SKILLS;
    } else {
      skillsData = FALLBACK_SKILLS;
    }
  } catch (e) {
    skillsData = FALLBACK_SKILLS;
  }

  renderSkills();
  initSkillsFilters();
}

function renderSkills() {
  const container = document.getElementById('skills-grid');
  if (!container) return;

  const filtered = currentSkillFilter === 'All'
    ? skillsData
    : skillsData.filter((s) => s.category.toLowerCase() === currentSkillFilter.toLowerCase());

  if (filtered.length === 0) {
    container.innerHTML = '<p class="text-muted">No skills found in this category.</p>';
    return;
  }

  container.innerHTML = filtered.map((skill) => `
    <div class="skill-card">
      <div class="skill-card-top">
        <div class="skill-icon-name">
          <i class="${skill.icon || 'fas fa-check-circle'} skill-icon"></i>
          <span class="skill-name">${skill.name}</span>
        </div>
        <span class="skill-percentage">${skill.level}%</span>
      </div>
      <div class="skill-bar-wrapper">
        <div class="skill-bar-progress" style="width: ${skill.level}%"></div>
      </div>
      <span class="skill-category-badge">${skill.category}</span>
    </div>
  `).join('');
}

function initSkillsFilters() {
  const filterBtns = document.querySelectorAll('.filter-tab-btn');
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      currentSkillFilter = btn.dataset.filter;
      renderSkills();
    });
  });
}

/* -------------------------------------------------------------
   8. Projects Section Engine (REST API & DB integration)
   ------------------------------------------------------------- */
async function loadProjects() {
  const projectsGrid = document.getElementById('projects-grid');
  if (!projectsGrid) return;

  try {
    const res = await fetch(`${API_BASE_URL}/api/projects`);
    if (res.ok) {
      const json = await res.json();
      projectsData = json.data && json.data.length > 0 ? json.data : FALLBACK_PROJECTS;
    } else {
      projectsData = FALLBACK_PROJECTS;
    }
  } catch (err) {
    projectsData = FALLBACK_PROJECTS;
  }

  renderProjects();
  initProjectsFilters();
}

function renderProjects() {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  const filtered = currentProjectFilter === 'All'
    ? projectsData
    : projectsData.filter((p) => p.category.toLowerCase() === currentProjectFilter.toLowerCase());

  if (filtered.length === 0) {
    grid.innerHTML = '<div class="loading-spinner">No projects found in this category.</div>';
    return;
  }

  grid.innerHTML = filtered.map((proj) => {
    const tags = Array.isArray(proj.tags) ? proj.tags : [];
    const imageSrc = proj.image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80';
    
    return `
      <div class="project-card" data-id="${proj.id}">
        <div class="project-thumb-container">
          <img src="${imageSrc}" alt="${proj.title}" class="project-thumb" loading="lazy">
          <span class="project-category-badge">${proj.category}</span>
          ${proj.featured ? '<span class="project-featured-badge"><i class="fas fa-star"></i> Featured</span>' : ''}
        </div>
        <div class="project-body">
          <h3 class="project-title">${proj.title}</h3>
          <p class="project-desc">${proj.description}</p>
          <div class="project-tags">
            ${tags.map((t) => `<span class="project-tag">${t}</span>`).join('')}
          </div>
          <div class="project-actions">
            <button class="btn btn-sm btn-outline btn-view-details" onclick="openProjectModal(${proj.id})">
              <span>View Details</span>
              <i class="fas fa-expand-alt"></i>
            </button>
            <div class="proj-action-links">
              ${proj.liveUrl ? `<a href="${proj.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn-icon-link" title="Live Preview"><i class="fas fa-external-link-alt"></i></a>` : ''}
              ${proj.githubUrl ? `<a href="${proj.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn-icon-link" title="GitHub Code"><i class="fab fa-github"></i></a>` : ''}
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function initProjectsFilters() {
  const tabs = document.querySelectorAll('.proj-tab');
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      currentProjectFilter = tab.dataset.cat;
      renderProjects();
    });
  });
}

/* -------------------------------------------------------------
   9. Modals Engine (Project Details & Add Project Form)
   ------------------------------------------------------------- */
function initModals() {
  // Project detail modal close
  const detailModal = document.getElementById('project-modal');
  const detailCloseBtn = document.getElementById('modal-close-btn');
  if (detailCloseBtn && detailModal) {
    detailCloseBtn.addEventListener('click', () => {
      detailModal.classList.remove('open');
      detailModal.setAttribute('aria-hidden', 'true');
    });
    detailModal.addEventListener('click', (e) => {
      if (e.target === detailModal) {
        detailModal.classList.remove('open');
        detailModal.setAttribute('aria-hidden', 'true');
      }
    });
  }

  // Add project modal
  const addModal = document.getElementById('add-project-modal');
  const addBtn = document.getElementById('btn-open-add-project');
  const addCloseBtn = document.getElementById('add-modal-close-btn');
  const addForm = document.getElementById('add-project-form');

  if (addBtn && addModal) {
    addBtn.addEventListener('click', () => {
      addModal.classList.add('open');
      addModal.setAttribute('aria-hidden', 'false');
    });
  }
  if (addCloseBtn && addModal) {
    addCloseBtn.addEventListener('click', () => {
      addModal.classList.remove('open');
      addModal.setAttribute('aria-hidden', 'true');
    });
    addModal.addEventListener('click', (e) => {
      if (e.target === addModal) {
        addModal.classList.remove('open');
        addModal.setAttribute('aria-hidden', 'true');
      }
    });
  }

  // Add project submit
  if (addForm) {
    addForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const title = document.getElementById('new-proj-title').value.trim();
      const category = document.getElementById('new-proj-category').value;
      const description = document.getElementById('new-proj-desc').value.trim();
      const tagsRaw = document.getElementById('new-proj-tags').value.trim();
      const liveUrl = document.getElementById('new-proj-live').value.trim();
      const githubUrl = document.getElementById('new-proj-gh').value.trim();

      const tags = tagsRaw ? tagsRaw.split(',').map((t) => t.trim()).filter(Boolean) : ['Node.js', 'Express'];

      const payload = {
        title,
        category,
        description,
        tags,
        liveUrl: liveUrl || '#',
        githubUrl: githubUrl || 'https://github.com/adityaaraaj0063',
        image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
        featured: 0
      };

      try {
        const res = await fetch(`${API_BASE_URL}/api/projects`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const result = await res.json();
        if (result.success) {
          showToast('Project added to database successfully!', 'success');
          addForm.reset();
          addModal.classList.remove('open');
          // Reload projects from database
          await loadProjects();
        } else {
          showToast(result.message || 'Failed to add project', 'error');
        }
      } catch (err) {
        // Fallback for static demo
        payload.id = Date.now();
        projectsData.unshift(payload);
        renderProjects();
        showToast('Project added locally!', 'success');
        addForm.reset();
        addModal.classList.remove('open');
      }
    });
  }
}

// Global modal trigger for individual project card
window.openProjectModal = function (id) {
  const project = projectsData.find((p) => p.id === id);
  if (!project) return;

  const modal = document.getElementById('project-modal');
  const body = document.getElementById('modal-content-body');
  if (!modal || !body) return;

  const tags = Array.isArray(project.tags) ? project.tags : [];
  const imageSrc = project.image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80';

  body.innerHTML = `
    <div class="modal-header-img" style="margin: -2.2rem -2.2rem 1.5rem -2.2rem; height: 260px; overflow: hidden; border-radius: 20px 20px 0 0;">
      <img src="${imageSrc}" alt="${project.title}" style="width: 100%; height: 100%; object-fit: cover;">
    </div>
    <div class="modal-badge"><i class="fas fa-folder"></i> ${project.category}</div>
    <h2 style="font-size: 1.6rem; margin-bottom: 0.8rem;">${project.title}</h2>
    <p style="color: var(--text-secondary); line-height: 1.7; margin-bottom: 1.5rem;">${project.description}</p>
    
    <div style="margin-bottom: 1.5rem;">
      <h4 style="font-size: 0.95rem; margin-bottom: 0.6rem; color: var(--text-muted); text-transform: uppercase;">Technologies & Architecture</h4>
      <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
        ${tags.map((t) => `<span class="project-tag" style="font-size: 0.85rem; padding: 0.35rem 0.8rem;">${t}</span>`).join('')}
      </div>
    </div>

    <div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-top: 2rem; border-top: 1px solid var(--border-subtle); padding-top: 1.5rem;">
      ${project.liveUrl ? `<a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary"><i class="fas fa-external-link-alt"></i> Live Demo</a>` : ''}
      ${project.githubUrl ? `<a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-outline"><i class="fab fa-github"></i> View Source Code</a>` : ''}
    </div>
  `;

  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
};

/* -------------------------------------------------------------
   10. Contact Form Submission (Full-Stack DB Write)
   ------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');

    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const subjectError = document.getElementById('subject-error');
    const messageError = document.getElementById('message-error');

    // Reset errors
    [nameError, emailError, subjectError, messageError].forEach((el) => {
      if (el) el.textContent = '';
    });
    [nameInput, emailInput, subjectInput, messageInput].forEach((el) => {
      if (el) el.classList.remove('error');
    });

    // Client-side validation
    let hasError = false;

    if (!nameInput.value.trim()) {
      nameError.textContent = 'Please enter your name.';
      nameInput.classList.add('error');
      hasError = true;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim()) {
      emailError.textContent = 'Please enter your email.';
      emailInput.classList.add('error');
      hasError = true;
    } else if (!emailRegex.test(emailInput.value.trim())) {
      emailError.textContent = 'Please enter a valid email address.';
      emailInput.classList.add('error');
      hasError = true;
    }

    if (!subjectInput.value.trim()) {
      subjectError.textContent = 'Please enter a subject.';
      subjectInput.classList.add('error');
      hasError = true;
    }

    if (!messageInput.value.trim()) {
      messageError.textContent = 'Please write a message.';
      messageInput.classList.add('error');
      hasError = true;
    }

    if (hasError) return;

    // Button loading state
    const submitBtn = document.getElementById('btn-submit-contact');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnIcon = submitBtn.querySelector('.btn-icon');
    const btnSpinner = submitBtn.querySelector('.btn-spinner');
    const formStatus = document.getElementById('form-status');

    submitBtn.disabled = true;
    btnText.textContent = 'Saving to Database...';
    btnIcon.style.display = 'none';
    btnSpinner.style.display = 'inline-block';

    const payload = {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      subject: subjectInput.value.trim(),
      message: messageInput.value.trim()
    };

    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        showToast('Thank you! Message saved to the database successfully.', 'success');
        form.reset();
        if (formStatus) {
          formStatus.className = 'form-status success';
          formStatus.style.display = 'flex';
          formStatus.innerHTML = '<i class="fas fa-check-circle"></i> Message recorded successfully into SQLite database!';
          setTimeout(() => { formStatus.style.display = 'none'; }, 6000);
        }
      } else {
        throw new Error(data.message || 'Error occurred while saving message');
      }
    } catch (err) {
      console.warn('Backend server not directly reachable, simulating success:', err.message);
      showToast('Message captured! (Backend demo mode)', 'success');
      form.reset();
    } finally {
      submitBtn.disabled = false;
      btnText.textContent = 'Send Message';
      btnIcon.style.display = 'inline-block';
      btnSpinner.style.display = 'none';
    }
  });
}

/* -------------------------------------------------------------
   11. Toast Notification Utility
   ------------------------------------------------------------- */
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <i class="${type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle'} toast-icon"></i>
    <span class="toast-message">${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => {
      toast.remove();
    }, 400);
  }, 3500);
}

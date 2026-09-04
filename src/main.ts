import { inject } from '@vercel/analytics';

// Initialize Vercel Web Analytics
inject();

/* ==========================================================================
   CONSTRUCTIVIST PORTFOLIO INTERACTIVE ENGINE - RIYA SINGH (TYPESCRIPT)
   ========================================================================== */

// --- TypeScript Interfaces ---
interface MindsetStep {
  title: string;
  desc: string;
  checklist: string[];
}

interface TechItem {
  name: string;
  category: 'prog' | 'web' | 'sec' | 'ai';
  pct: number;
  badge: string;
}

interface ProjectData {
  title: string;
  category: string;
  score: string;
  desc: string;
  tags: string[];
  details: string;
}

// --- Audio Synth Synthesizer for Constructivist Feedback ---
let audioEnabled = true;
const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
const audioCtx: AudioContext | null = AudioCtxClass ? new AudioCtxClass() : null;

function playClickSound(freq: number = 440, type: OscillatorType = 'square', duration: number = 0.05): void {
  if (!audioEnabled || !audioCtx) return;
  try {
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch {
    // Audio context fallback
  }
}

// Audio Toggle Button
document.getElementById('audio-toggle-btn')?.addEventListener('click', () => {
  audioEnabled = !audioEnabled;
  const btn = document.getElementById('audio-toggle-btn');
  if (btn) {
    btn.innerHTML = audioEnabled ? '🔊' : '🔇';
  }
});

// Mobile Hamburger Navigation Drawer Toggle
const mobileNavToggle = document.getElementById('mobile-nav-toggle');
const navLinksContainer = document.getElementById('nav-links-container');

if (mobileNavToggle && navLinksContainer) {
  mobileNavToggle.addEventListener('click', () => {
    navLinksContainer.classList.toggle('mobile-open');
    mobileNavToggle.classList.toggle('active');
    playClickSound(620, 'sine', 0.04);
  });

  // Close nav menu when clicking any nav item link on mobile
  navLinksContainer.querySelectorAll('.nav-item').forEach(link => {
    link.addEventListener('click', () => {
      navLinksContainer.classList.remove('mobile-open');
      mobileNavToggle.classList.remove('active');
    });
  });
}

// Sound effect listener on constructivist buttons & nodes
document.querySelectorAll<HTMLElement>('.constructivist-btn, .pipeline-node, .tech-filter-btn').forEach(btn => {
  btn.addEventListener('click', () => playClickSound(580, 'square', 0.04));
});


// --- 1. Hero Typing Animation ---
const typingPhrases: string[] = [
  "Computer Science Engineering Student",
  "MERN Stack Developer",
  "Cybersecurity Enthusiast",
  "AI & Blockchain Explorer",
  "DSA & Algorithmic Problem Solver",
  "🥇 Incuverse 1.0 Trophy Winner"
];

let phraseIdx = 0;
let charIdx = 0;
let isDeleting = false;
const typingTarget = document.getElementById('typing-text');

function typeAnimation(): void {
  if (!typingTarget) return;

  const currentPhrase = typingPhrases[phraseIdx];

  if (isDeleting) {
    typingTarget.textContent = currentPhrase.substring(0, charIdx - 1);
    charIdx--;
  } else {
    typingTarget.textContent = currentPhrase.substring(0, charIdx + 1);
    charIdx++;
  }

  let typeSpeed = isDeleting ? 40 : 80;

  if (!isDeleting && charIdx === currentPhrase.length) {
    typeSpeed = 2000; // Pause at end
    isDeleting = true;
  } else if (isDeleting && charIdx === 0) {
    isDeleting = false;
    phraseIdx = (phraseIdx + 1) % typingPhrases.length;
    typeSpeed = 500;
  }

  setTimeout(typeAnimation, typeSpeed);
}

typeAnimation();


// --- 2. Interactive Terminal Engine ---
const termInput = document.getElementById('term-input') as HTMLInputElement | null;
const termBody = document.getElementById('term-body');

const terminalCommands: Record<string, string> = {
  whoami: `Computer Science Engineering Student
MERN Stack Developer
Cybersecurity Enthusiast
AI & Blockchain Explorer
Problem Solver
Tech & Innovation Enthusiast`,

  education: `🎓 Lokmanya Tilak College of Engineering
   Bachelor of Technology — Computer Science Engineering
   Specialization: IoT & Cybersecurity including Blockchain Technology
   Dates: Sept 2024 — July 2028 | Mumbai, Maharashtra

🏫 SIES College of Arts, Science & Commerce
   Higher Secondary Education — Science Stream
   Dates: June 2023 — March 2024 | Sion, Mumbai`,

  skills: `💻 Languages: JavaScript, Python, Java, HTML, CSS, Bash
🌐 Web Stack: React.js, Node.js, Express.js, MongoDB, REST APIs
🔐 Security: Web Security, OWASP, Defensive Coding, Ethical Hacking
🤖 Emerging: AI, TensorFlow, IoT Hardware, Blockchain Smart Contracts`,

  achievements: `🏆 WINNER — Incuverse 1.0 (riidl)
   Organized by Research Innovation Incubation Design Labs.
   Presented technology-driven solution addressing real-world challenges.`,

  projects: `1. CyberShield - Web Security Audit Engine [Security]
2. Nexus-MERN - Full-Stack E-Commerce & Portal [MERN]
3. IoT-Block - Sensor Ledger Platform [IoT/Blockchain]
4. Incuverse Winner Solution - Smart Innovation Hub [Innovation]`,

  help: `Available commands:
  whoami       - Display profile overview
  education    - View academic history
  skills       - View tech stack matrix
  achievements - View Incuverse 1.0 victory details
  projects     - List featured projects
  clear        - Clear terminal screen`
};

if (termInput && termBody) {
  termInput.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      const inputVal = termInput.value.trim().toLowerCase();
      playClickSound(700, 'sine', 0.05);

      if (inputVal === 'clear') {
        termBody.innerHTML = '';
        termInput.value = '';
        return;
      }

      // Render Prompt & Command
      const cmdRow = document.createElement('div');
      cmdRow.className = 'term-line';
      cmdRow.innerHTML = `<span class="t-prompt">└─$</span> <span class="t-cmd">${escapeHTML(inputVal)}</span>`;
      termBody.appendChild(cmdRow);

      // Render Output
      const outRow = document.createElement('div');
      outRow.className = 'term-output';

      if (terminalCommands[inputVal]) {
        outRow.textContent = terminalCommands[inputVal];
      } else if (inputVal !== '') {
        outRow.textContent = `Command not recognized: '${inputVal}'. Type 'help' for options.`;
        outRow.style.color = '#EF4444';
      }

      termBody.appendChild(outRow);
      termInput.value = '';
      termBody.scrollTop = termBody.scrollHeight;
    }
  });
}


// --- 3. Developer Mindset Pipeline Logic ---
const mindsetSteps: MindsetStep[] = [
  {
    title: "01 // PROBLEM IDENTIFICATION",
    desc: "Understanding the real-world domain problem, user pain points, and threat vectors before writing code.",
    checklist: [
      "User Story & Requirements Gathering",
      "Domain Context Analysis",
      "Risk & Impact Assessment",
      "Feasibility Study & Scoping"
    ]
  },
  {
    title: "02 // ARCHITECTURAL ANALYSIS",
    desc: "Deconstructing complexity into modular components, data schemas, API contracts, and threat models.",
    checklist: [
      "Data Flow Diagrams (DFD)",
      "Database Schema Design (MongoDB / SQL)",
      "Threat Modeling & Attack Surface Scoping",
      "API Endpoint Specifications"
    ]
  },
  {
    title: "03 // UI/UX & SYSTEM DESIGN",
    desc: "Crafting wireframes, component hierarchies, and secure access boundaries for seamless UX.",
    checklist: [
      "Constructivist & Modern Visual Design",
      "Component Architecture Planning",
      "Authentication & Role Permission Matrix",
      "State Management Strategy"
    ]
  },
  {
    title: "04 // MODULAR IMPLEMENTATION (CODE)",
    desc: "Writing clean, maintainable, object-oriented code leveraging MERN stack & clean code principles.",
    checklist: [
      "Reusable React Component Libraries",
      "Express REST API Controllers",
      "Input Validation & Schema Enforcement",
      "Version Control & Modular Commits"
    ]
  },
  {
    title: "05 // DEFENSIVE SECURITY AUDIT 🔐",
    desc: "Rigorous security evaluation, vulnerability scanning, input sanitization, and encryption validation.",
    checklist: [
      "OWASP Top 10 Vulnerability Audit",
      "XSS, SQLi & CSRF Prevention Checks",
      "Bcrypt Hashing & JWT Token Hardening",
      "Secure Headers (Helmet.js) & CORS Scope"
    ]
  },
  {
    title: "06 // PRODUCTION DEPLOYMENT & MONITORING 🚀",
    desc: "Automated build deployment, environment isolation, continuous monitoring, and performance scaling.",
    checklist: [
      "CI/CD Build Pipeline Verification",
      "Production Environment Isolation",
      "Performance Optimization & Caching",
      "Live Health Checks & Error Logging"
    ]
  }
];

function renderMindsetStep(idx: number): void {
  const container = document.getElementById('mindset-detail');
  if (!container) return;

  const data = mindsetSteps[idx];
  container.innerHTML = `
    <div class="detail-title">${data.title}</div>
    <div class="detail-desc">${data.desc}</div>
    <div class="checklist-title">ENGINEERING CHECKLIST & VERIFICATION:</div>
    <ul class="detail-checklist">
      ${data.checklist.map(item => `<li>✔️ ${item}</li>`).join('')}
    </ul>
  `;

  // Update active state on nodes
  document.querySelectorAll<HTMLElement>('.pipeline-node').forEach((node, i) => {
    if (i === idx) {
      node.classList.add('active');
    } else {
      node.classList.remove('active');
    }
  });
}

document.querySelectorAll<HTMLElement>('.pipeline-node').forEach((node) => {
  node.addEventListener('click', () => {
    const step = parseInt(node.getAttribute('data-step') || '0', 10);
    renderMindsetStep(step);
    playClickSound(640, 'triangle', 0.05);
  });
});

// Initial Mindset Step
renderMindsetStep(0);


// --- 4. Tech Matrix Data & Filter Engine ---
const techItems: TechItem[] = [
  { name: "JavaScript (ES6+)", category: "prog", pct: 92, badge: "LANG" },
  { name: "Python 3", category: "prog", pct: 88, badge: "LANG" },
  { name: "Java (OOP)", category: "prog", pct: 82, badge: "LANG" },
  { name: "HTML5 & CSS3", category: "prog", pct: 95, badge: "LANG" },
  
  { name: "React.js", category: "web", pct: 90, badge: "FRONTEND" },
  { name: "Node.js", category: "web", pct: 86, badge: "BACKEND" },
  { name: "Express.js", category: "web", pct: 88, badge: "BACKEND" },
  { name: "MongoDB", category: "web", pct: 84, badge: "DATABASE" },
  { name: "REST APIs", category: "web", pct: 90, badge: "API" },

  { name: "Linux & Terminal", category: "sec", pct: 86, badge: "SYS" },
  { name: "Bash Scripting", category: "sec", pct: 82, badge: "SYS" },
  { name: "Web Security & OWASP", category: "sec", pct: 88, badge: "CYBER" },
  { name: "Git & GitHub", category: "sec", pct: 90, badge: "DEVOPS" },

  { name: "TensorFlow / AI", category: "ai", pct: 75, badge: "AI" },
  { name: "IoT Hardware & Sensors", category: "ai", pct: 80, badge: "IOT" },
  { name: "Blockchain Tech", category: "ai", pct: 78, badge: "BLOCKCHAIN" }
];

function renderTechGrid(filter: string = 'all'): void {
  const container = document.getElementById('tech-grid');
  if (!container) return;

  const filtered = filter === 'all' 
    ? techItems 
    : techItems.filter(item => item.category === filter);

  container.innerHTML = filtered.map(item => `
    <div class="tech-card">
      <div class="tech-card-header">
        <span class="tech-name">${item.name}</span>
        <span class="tech-badge">${item.badge}</span>
      </div>
      <div class="tech-bar-bg">
        <div class="tech-bar-fill" style="width: ${item.pct}%"></div>
      </div>
    </div>
  `).join('');
}

document.querySelectorAll<HTMLElement>('.tech-filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tech-filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.getAttribute('data-filter') || 'all';
    renderTechGrid(filter);
  });
});

renderTechGrid('all');


// --- 5. Featured Projects Data & Render ---
const projectsData: ProjectData[] = [
  {
    title: "CyberShield Web Audit Engine",
    category: "CYBERSECURITY",
    score: "SECURITY SCORE: 98/100",
    desc: "A defensive web security scanner that inspects headers, SSL/TLS configurations, XSS payloads, and OWASP vulnerabilities with automated logs.",
    tags: ["Security Audit", "Node.js", "OWASP Top 10", "Web Hacking", "Cryptography"],
    details: "CyberShield simulates static & dynamic security testing (SAST/DAST). It parses HTTP headers (Helmet compliance, CSP rules, HSTS) and flags vulnerable script tags."
  },
  {
    title: "Nexus MERN Application Portal",
    category: "FULL-STACK MERN",
    score: "PERFORMANCE: OPTIMIZED",
    desc: "Scalable full-stack application featuring JWT authentication, MongoDB schema validation, React state context, and Express API routing.",
    tags: ["React.js", "Node.js", "Express.js", "MongoDB", "Vanilla CSS"],
    details: "Engineered with modular component architecture, robust API error handling middleware, and encrypted user data handling using Bcrypt."
  },
  {
    title: "IoT-Block Sensor Ledger",
    category: "AI, IOT & BLOCKCHAIN",
    score: "DECENTRALIZED LOG",
    desc: "An experimental platform recording IoT hardware sensor telemetry onto an immutable cryptographic blockchain ledger for tamper-evident verification.",
    tags: ["IoT Sensors", "Blockchain", "Smart Contracts", "Python", "Data Integrity"],
    details: "Combines micro-controller telemetry streaming with SHA-256 hashed blocks, ensuring sensor logs cannot be modified post-deployment."
  },
  {
    title: "Incuverse 1.0 Winner Solution",
    category: "INNOVATION & INCUBATION",
    score: "🥇 1ST PLACE WINNER",
    desc: "The award-winning technology solution presented at riidl Incuverse 1.0, combining entrepreneurship, rapid prototyping, and real-world impact.",
    tags: ["riidl Winner", "Entrepreneurship", "Prototyping", "Full-Stack", "Innovation"],
    details: "Winner of Incuverse 1.0 organized by riidl (Research Innovation Incubation Design Labs). Developed under high-tempo competition conditions with business & tech feasibility."
  }
];

function renderProjects(): void {
  const container = document.getElementById('projects-container');
  if (!container) return;

  container.innerHTML = projectsData.map((p, idx) => `
    <div class="project-card">
      <div class="project-header">
        <span class="p-cat">${p.category}</span>
        <span class="p-sec-score">${p.score}</span>
      </div>
      <div class="project-body">
        <h3 class="p-title">${p.title}</h3>
        <p class="p-desc">${p.desc}</p>
        <div class="p-tags">
          ${p.tags.map(t => `<span class="p-tag">${t}</span>`).join('')}
        </div>
      </div>
      <div class="project-footer">
        <button class="constructivist-btn btn-sm btn-cyan w-full open-project-modal" data-pidx="${idx}">
          <span>VIEW SPECIFICATIONS & DEMO ➔</span>
        </button>
      </div>
    </div>
  `).join('');

  document.querySelectorAll<HTMLElement>('.open-project-modal').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.getAttribute('data-pidx') || '0', 10);
      openProjectModal(idx);
    });
  });
}

renderProjects();


// --- Utility Functions & Modals System ---
function escapeHTML(str: string): string {
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}

const modal = document.getElementById('constructivist-modal');
const modalTitle = document.getElementById('modal-title');
const modalBody = document.getElementById('modal-body');
const modalClose = document.getElementById('modal-close-btn');

function openModal(title: string, contentHTML: string): void {
  if (!modal || !modalTitle || !modalBody) return;
  modalTitle.textContent = title;
  modalBody.innerHTML = contentHTML;
  modal.classList.remove('hidden');
  playClickSound(750, 'square', 0.08);
}

if (modalClose) {
  modalClose.addEventListener('click', () => {
    modal?.classList.add('hidden');
  });
}

if (modal) {
  modal.addEventListener('click', (e: MouseEvent) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
    }
  });
}

// Incuverse 1.0 Victory Modal Button Listener
document.getElementById('view-incuverse-details')?.addEventListener('click', () => {
  openModal(
    "INCUVERSE 1.0 VICTORY BREAKDOWN — riidl",
    `
      <div class="constructivist-card p-4">
        <h3 class="text-xl font-heading text-red mb-2">🥇 WINNER — INCUVERSE 1.0 COMPETITION</h3>
        <p class="mb-3"><strong>Organized by:</strong> riidl (Research Innovation Incubation Design Labs)</p>
        <div class="bg-dark-grid p-3 mb-3 border-left-red font-mono text-sm">
          SOLUTION HIGHLIGHTS:
          • Tech-driven innovation prototype for real-world impact
          • Viable business model & architecture scaling
          • Interdisciplinary integration of Full-Stack, IoT & Security
        </div>
        <p class="text-sm">Incuverse 1.0 tested technological ingenuity, rapid execution, and pitch delivery. Riya Singh's team emerged victorious among competing student teams!</p>
      </div>
    `
  );
});

function openProjectModal(idx: number): void {
  const p = projectsData[idx];
  openModal(
    `PROJECT SPECIFICATION // ${p.title}`,
    `
      <div class="constructivist-card p-3">
        <div class="badge-tag text-cyan mb-2 font-mono">${p.category} | ${p.score}</div>
        <h3 class="text-2xl font-heading text-black mb-3">${p.title}</h3>
        <p class="mb-4 text-base">${p.desc}</p>
        
        <div class="p-box cyan mb-4">
          <h4 class="font-mono text-sm">TECHNICAL ARCHITECTURE:</h4>
          <p class="text-sm">${p.details}</p>
        </div>

        <div class="mb-4">
          <strong>TECHNOLOGY STACK:</strong>
          <div class="flex gap-2 mt-2" style="flex-wrap:wrap;">
            ${p.tags.map(t => `<span class="p-tag">${t}</span>`).join('')}
          </div>
        </div>

        <div class="border-top pt-3 flex gap-3" style="flex-wrap:wrap; margin-top:1rem;">
          <button class="constructivist-btn btn-sm btn-red" onclick="alert('Simulated Live Demo Launched!')">
            <span>LIVE DEMO PREVIEW</span>
          </button>
          <button class="constructivist-btn btn-sm btn-outline" onclick="alert('GitHub Repository Link Simulated')">
            <span>GITHUB REPO ↗</span>
          </button>
        </div>
      </div>
    `
  );
}

console.log("Riya Singh Constructivist Portfolio Engine initialized in TypeScript.");

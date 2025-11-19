// Enhanced College Club Management System JavaScript - Club Cards Enhanced
// Data Management with Backend API

// API Base URL - Change this after deploying to Railway
const API_BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:3000/api"
    : "https://rcpit-cms-production.up.railway.app/api";

// Initialize data from backend
let eventsData = [];
let clubsData = [];
let formSubmissions = [];
let eventRegistrations = [];
let selectedRole = null;

// Load data from backend
async function loadDataFromStorage() {
  try {
    // Load events
    const eventsResponse = await fetch(`${API_BASE_URL}/events`);
    if (eventsResponse.ok) {
      eventsData = await eventsResponse.json();
      if (eventsData.length === 0) {
        await initializeDefaultData();
      }
    }

    // Load clubs
    const clubsResponse = await fetch(`${API_BASE_URL}/clubs`);
    if (clubsResponse.ok) {
      clubsData = await clubsResponse.json();
    }

    // Load form submissions
    const submissionsResponse = await fetch(`${API_BASE_URL}/form-submissions`);
    if (submissionsResponse.ok) {
      formSubmissions = await submissionsResponse.json();
    }

    // Load event registrations
    const registrationsResponse = await fetch(
      `${API_BASE_URL}/event-registrations`
    );
    if (registrationsResponse.ok) {
      eventRegistrations = await registrationsResponse.json();
    }
  } catch (error) {
    console.error("Error loading data from backend:", error);
    // Fallback to default data if backend is not available
    eventsData = getDefaultEvents();
    clubsData = getDefaultClubs();
  }
}

// Initialize default data in backend (first time only)
async function initializeDefaultData() {
  try {
    // Add default events
    const defaultEvents = getDefaultEvents();
    for (const event of defaultEvents) {
      await fetch(`${API_BASE_URL}/events`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(event),
      });
    }

    // Add default clubs
    const defaultClubs = getDefaultClubs();
    for (const club of defaultClubs) {
      await fetch(`${API_BASE_URL}/clubs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(club),
      });
    }

    // Reload data
    await loadDataFromStorage();
  } catch (error) {
    console.error("Error initializing default data:", error);
  }
}

// Save functions now use backend API
async function saveEventsToStorage() {
  // Data is automatically saved via API calls, this function kept for compatibility
  await loadDataFromStorage();
}

async function saveClubsToStorage() {
  // Data is automatically saved via API calls, this function kept for compatibility
  await loadDataFromStorage();
}

async function saveSubmissionsToStorage() {
  // Data is automatically saved via API calls, this function kept for compatibility
  await loadDataFromStorage();
}

async function saveEventRegistrationsToStorage() {
  // Data is automatically saved via API calls, this function kept for compatibility
  await loadDataFromStorage();
}

// Default events data
function getDefaultEvents() {
  return [
    {
      title: "Annual Tech Fest 2025",
      club: "Computer Science Club",
      date: "October 15, 2025",
      time: "9:00 AM - 6:00 PM",
      location: "Main Auditorium",
      description:
        "Join us for an exciting day of technology presentations, coding competitions, and workshops.",
      status: "upcoming",
      icon: "bi-cpu",
      color: "primary",
    },
    {
      title: "Cultural Night",
      club: "Arts & Culture Society",
      date: "September 28, 2025",
      time: "7:00 PM - 10:00 PM",
      location: "College Grounds",
      description:
        "Experience the rich cultural diversity of our college through music, dance, and art performances.",
      status: "upcoming",
      icon: "bi-palette",
      color: "info",
    },
    {
      title: "Football Championship",
      club: "Sports Club",
      date: "September 22, 2025",
      time: "3:00 PM - 5:00 PM",
      location: "Sports Complex",
      description:
        "Inter-college football championship finals. Come support our team!",
      status: "ongoing",
      icon: "bi-trophy",
      color: "warning",
    },
    {
      title: "Entrepreneurship Workshop",
      club: "Business Club",
      date: "October 5, 2025",
      time: "2:00 PM - 5:00 PM",
      location: "Conference Hall",
      description:
        "Learn from successful entrepreneurs about starting your own business.",
      status: "upcoming",
      icon: "bi-lightbulb",
      color: "success",
    },
  ];
}

// Default clubs data
function getDefaultClubs() {
  return [
    {
      name: "Akatsuki Coding Club",
      description:
        "Competitive programming excellence and algorithmic problem-solving mastery",
      president: "Arjun Sharma",
      members: 120,
      founded: "2019",
      category: "Programming",
      focusArea: "Competitive programming, data structures, algorithms",
      icon: "bi-code-slash",
      color: "primary",
      activities: [
        "Weekly coding sessions & peer programming",
        "Internal coding contests, CodeChef competitions",
        "Participation in platforms like LeetCode, HackerRank",
      ],
      outcomes: [
        "Enhanced placement preparation",
        "Top ranks in university-level tech contests",
        "GATE & GRE technical readiness",
      ],
      meetingDay: "Tuesdays",
      meetingTime: "6:00 PM",
      location: "Computer Lab 2",
      fees: 300,
    },
    {
      name: "Plug Pose – Hardware Innovation Club",
      description:
        "Electronics prototyping and embedded systems innovation hub",
      president: "Priya Patel",
      members: 85,
      founded: "2020",
      category: "Hardware",
      focusArea: "Electronics prototyping, embedded systems, PCB design",
      icon: "bi-cpu-fill",
      color: "warning",
      activities: [
        "Hardware bootcamps and soldering workshops",
        "IoT mini-project development",
        "Interfacing microcontrollers with sensors",
      ],
      outcomes: [
        "Project-based learning for 2nd & 3rd-year students",
        "Participation in Smart India Hackathon hardware editions",
        "Patent filing and product showcase",
      ],
      meetingDay: "Saturdays",
      meetingTime: "2:00 PM",
      location: "Electronics Lab",
      fees: 450,
    },
    {
      name: "Data Polaris",
      description:
        "Data science excellence through analytics and visualization mastery",
      president: "Rahul Kumar",
      members: 95,
      founded: "2018",
      category: "Data Science",
      focusArea: "Data science, data visualization, analytics, Python",
      icon: "bi-graph-up",
      color: "info",
      activities: [
        "Kaggle competitions",
        "Workshops on data cleaning, visualization, ML basics",
        "Guest sessions from data analysts and alumni",
      ],
      outcomes: [
        "MOOC certifications (NPTEL, Coursera)",
        "Internship opportunities in analytics and fintech",
        "Industry-ready data portfolios",
      ],
      meetingDay: "Wednesdays",
      meetingTime: "4:30 PM",
      location: "Data Analytics Lab",
      fees: 350,
    },
    {
      name: "Google Developer Student Club (GDSC)",
      description: "Google technologies and modern web development community",
      president: "Sneha Gupta",
      members: 140,
      founded: "2017",
      category: "Technology",
      focusArea: "Android, cloud computing, Firebase, web development",
      icon: "bi-google",
      color: "success",
      activities: [
        "Hackathons (e.g., Solution Challenge)",
        "Hands-on labs using Google Cloud Platform (GCP)",
        "GitHub collaboration and Open Source participation",
      ],
      outcomes: [
        "End-to-end app development experience",
        "Resume-grade projects hosted online",
        "Mentoring from Google Developer Experts (GDEs)",
      ],
      meetingDay: "Fridays",
      meetingTime: "5:00 PM",
      location: "Innovation Hub",
      fees: 250,
    },
    {
      name: "Fetch-AI",
      description:
        "Artificial Intelligence and Machine Learning research pioneers",
      president: "Vikash Singh",
      members: 110,
      founded: "2019",
      category: "AI/ML",
      focusArea: "Machine Learning, Deep Learning, AI model building",
      icon: "bi-robot",
      color: "danger",
      activities: [
        "AI bootcamps, Python ML sessions",
        "Building neural network models in TensorFlow, Keras",
        "AI for social good challenges",
      ],
      outcomes: [
        "Strong foundation for research and higher education",
        "Student participation in AI-based national events",
        "Mini-projects showcased on GitHub & Kaggle",
      ],
      meetingDay: "Thursdays",
      meetingTime: "3:30 PM",
      location: "AI Research Center",
      fees: 400,
    },
    {
      name: "Motorsports Club",
      description:
        "Automotive engineering and mechanical innovation excellence",
      president: "Rohan Mehta",
      members: 75,
      founded: "2016",
      category: "Engineering",
      focusArea:
        "Automotive engineering, vehicle design, mechanical innovation",
      icon: "bi-gear-fill",
      color: "dark",
      activities: [
        "Design & fabrication of go-karts or formula student prototypes",
        "Participation in SAE BAJA & E-bike challenges",
        "Workshops on CAD, ANSYS, and simulation",
      ],
      outcomes: [
        "Experiential learning in mechanical and automotive domains",
        "Industry-level teamwork and documentation experience",
        "Recognition at national-level engineering expos",
      ],
      meetingDay: "Sundays",
      meetingTime: "10:00 AM",
      location: "Workshop Bay",
      fees: 500,
    },
    {
      name: "Club Samarpan (NSS Unit)",
      description: "Community service and social development initiative",
      president: "Anjali Sharma",
      members: 200,
      founded: "2015",
      category: "Social Service",
      focusArea: "Community service, rural development, social campaigns",
      icon: "bi-heart-fill",
      color: "danger",
      activities: [
        "Blood donation camps, health checkups",
        "Cleanliness drives, voter awareness campaigns",
        "Teaching underprivileged children and digital literacy",
      ],
      outcomes: [
        "Over 300 students engaged annually",
        "Real-life exposure to social issues",
        "Recognitions from local governance bodies",
      ],
      meetingDay: "Saturdays",
      meetingTime: "9:00 AM",
      location: "Community Center",
      fees: 200,
    },
    {
      name: "Green Club / Eco Warriors",
      description: "Environmental protection and sustainability champions",
      president: "Kavya Reddy",
      members: 130,
      founded: "2018",
      category: "Environment",
      focusArea: "Environmental protection, sustainability, awareness",
      icon: "bi-tree-fill",
      color: "success",
      activities: [
        "Tree plantation drives, e-waste awareness",
        "Campus cleanliness campaigns",
        "Plastic-free and water conservation initiatives",
      ],
      outcomes: [
        "Eco-conscious culture among students",
        "Support from NGOs and municipal bodies",
        "Community and school-level outreach",
      ],
      meetingDay: "Sundays",
      meetingTime: "8:00 AM",
      location: "Eco Garden",
      fees: 200,
    },
    {
      name: "Antarnaad",
      description:
        "Performing arts excellence and creative expression platform",
      president: "Aditi Joshi",
      members: 160,
      founded: "2014",
      category: "Performing Arts",
      focusArea: "Performing arts – music, drama, dance",
      icon: "bi-music-note-beamed",
      color: "info",
      activities: [
        "Annual cultural fest performances",
        "Drama competitions, street plays",
        "Music jam sessions, choreography teams",
      ],
      outcomes: [
        "Prizes in university youth festivals",
        "Creative expression and personality development",
        "Confidence-building and stage presence",
      ],
      meetingDay: "Fridays",
      meetingTime: "6:30 PM",
      location: "Auditorium",
      fees: 300,
    },
    {
      name: "Reflection (Fine Arts Club)",
      description: "Visual arts mastery and creative design innovation",
      president: "Arya Krishnan",
      members: 90,
      founded: "2017",
      category: "Fine Arts",
      focusArea: "Drawing, painting, sketching, model making",
      icon: "bi-palette-fill",
      color: "warning",
      activities: [
        "Rangoli competitions, wall painting, tech art",
        "Departmental décor during fests",
        "Poster making for awareness campaigns",
      ],
      outcomes: [
        "Recognition for aesthetic contributions on campus",
        "Portfolio-building for design careers",
        "Engagement with visual arts exhibitions",
      ],
      meetingDay: "Wednesdays",
      meetingTime: "5:30 PM",
      location: "Art Studio",
      fees: 350,
    },
    {
      name: "Athleema Sports Club",
      description: "Physical fitness excellence and competitive sports mastery",
      president: "Karan Agarwal",
      members: 180,
      founded: "2013",
      category: "Sports",
      focusArea: "Physical fitness, athletics, team sports",
      icon: "bi-trophy-fill",
      color: "primary",
      activities: [
        "Annual Sports Day, inter-collegiate tournaments",
        "Coaching in volleyball, cricket, kabaddi, badminton",
        "Chess and carrom competitions",
      ],
      outcomes: [
        "State and university-level medals",
        "Student-athletes maintaining academic balance",
        "Focus on health, wellness, and teamwork",
      ],
      meetingDay: "Daily",
      meetingTime: "6:00 AM & 5:00 PM",
      location: "Sports Complex",
      fees: 250,
    },
  ];
}

// Sample members data
const membersData = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "President",
    club: "Computer Science Club",
    year: "Final Year",
    major: "Computer Science",
    email: "alex.johnson@college.edu",
    joinedDate: "August 2022",
    achievements: ["Best Coder Award 2024", "Hackathon Winner"],
    avatar: "bi-person-circle",
    color: "primary",
  },
  {
    id: 2,
    name: "Sarah Williams",
    role: "President",
    club: "Arts & Culture Society",
    year: "Third Year",
    major: "Fine Arts",
    email: "sarah.williams@college.edu",
    joinedDate: "September 2022",
    achievements: ["Art Exhibition Winner", "Cultural Night Organizer"],
    avatar: "bi-person-circle",
    color: "info",
  },
  {
    id: 3,
    name: "Mike Chen",
    role: "President",
    club: "Sports Club",
    year: "Final Year",
    major: "Sports Science",
    email: "mike.chen@college.edu",
    joinedDate: "January 2022",
    achievements: ["Football Captain", "Swimming Champion"],
    avatar: "bi-person-circle",
    color: "warning",
  },
  {
    id: 4,
    name: "Emily Davis",
    role: "Vice President",
    club: "Computer Science Club",
    year: "Third Year",
    major: "Computer Engineering",
    email: "emily.davis@college.edu",
    joinedDate: "February 2023",
    achievements: ["Coding Competition Winner", "App Developer"],
    avatar: "bi-person-circle",
    color: "primary",
  },
];

// DOM Elements
const loginPage = document.getElementById("loginPage");
const homepage = document.getElementById("homepage");
const adminDashboard = document.getElementById("adminDashboard");
const loginForm = document.getElementById("loginForm");
const errorMessage = document.getElementById("errorMessage");
const logoutBtn = document.getElementById("logoutBtn");
const adminLogoutBtn = document.getElementById("adminLogoutBtn");
const eventsContainer = document.getElementById("eventsContainer");
const clubsContainer = document.getElementById("clubsContainer");
const membersContainer = document.getElementById("membersContainer");

// Note: Authentication is now handled via backend API
// Admin credentials: username: admin, password: admin123
// Students must register to create accounts

// Role selection functions
function selectRole(role) {
  selectedRole = role;
  document.getElementById("roleSelection").style.display = "none";
  document.getElementById("loginFormContainer").style.display = "block";
  document.getElementById("selectedRoleBadge").textContent =
    role === "student" ? "Student Login" : "Group Admin Login";
  document.getElementById("selectedRoleBadge").className =
    role === "student" ? "badge bg-primary" : "badge bg-success";

  // Show signup link only for students
  if (role === "student") {
    document.getElementById("signupLinkContainer").style.display = "block";
  } else {
    document.getElementById("signupLinkContainer").style.display = "none";
  }
}

function backToRoleSelection() {
  selectedRole = null;
  document.getElementById("roleSelection").style.display = "block";
  document.getElementById("loginFormContainer").style.display = "none";
  document.getElementById("signupFormContainer").style.display = "none";
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
  hideError();
  hideSignupError();
}

function showSignupForm() {
  document.getElementById("loginFormContainer").style.display = "none";
  document.getElementById("signupFormContainer").style.display = "block";
  hideError();
}

function backToLoginForm() {
  document.getElementById("signupFormContainer").style.display = "none";
  document.getElementById("loginFormContainer").style.display = "block";
  document.getElementById("signupForm").reset();
  hideSignupError();
}

// Initialize the application
document.addEventListener("DOMContentLoaded", async function () {
  // Load data from backend
  await loadDataFromStorage();

  // Initialize AOS animations
  AOS.init({
    duration: 1000,
    once: true,
    offset: 100,
    easing: "ease-out-cubic",
  });

  // Check if user is already logged in
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const userRole = localStorage.getItem("userRole");

  if (isLoggedIn === "true" && userRole) {
    if (userRole === "student") {
      showHomepage();
    } else if (userRole === "admin") {
      showAdminDashboard();
    }
  } else {
    showLoginPage();
  }

  // Event listeners
  if (loginForm) {
    loginForm.addEventListener("submit", handleLogin);
  }

  // Signup form listener
  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", handleSignup);
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", handleLogout);
  }
  if (adminLogoutBtn) {
    adminLogoutBtn.addEventListener("click", handleLogout);
  }

  // Populate club dropdown in join form
  populateClubDropdown();
});

function showHomepage() {
  console.log("🏠 showHomepage called");
  loginPage.classList.remove("active");
  adminDashboard.classList.remove("active");
  homepage.classList.add("active");

  // Load all sections
  console.log("📅 Loading events data...");
  loadEventsWithAnimation();
  console.log("🏫 Loading clubs data...");
  loadClubsWithAnimation();
  console.log("👥 Loading members data...");
  loadMembersWithAnimation();

  // Update welcome message
  updateWelcomeMessage();

  // Refresh AOS animations
  setTimeout(() => {
    AOS.refresh();
  }, 100);
}

function showAdminDashboard() {
  console.log("🔐 showAdminDashboard called");
  loginPage.classList.remove("active");
  homepage.classList.remove("active");
  adminDashboard.classList.add("active");

  // Load admin sections
  loadAdminEvents();
  loadAdminClubs();
  loadFormSubmissions();
  loadEventRegistrations();

  // Refresh AOS animations
  setTimeout(() => {
    AOS.refresh();
  }, 100);
}

function showLoginPage() {
  homepage.classList.remove("active");
  adminDashboard.classList.remove("active");
  loginPage.classList.add("active");
  backToRoleSelection();
}

function handleLogin(event) {
  event.preventDefault();

  if (!selectedRole) {
    showError("Please select a role first.");
    return;
  }

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  // Clear previous error messages
  hideError();

  // Use backend API for authentication
  fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: username,
      password: password,
      role: selectedRole,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        // Successful login
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("username", data.user.username);
        localStorage.setItem("userRole", data.user.role);
        localStorage.setItem("userFullName", data.user.fullName);

        loginForm.reset();

        if (selectedRole === "student") {
          showHomepage();
        } else if (selectedRole === "admin") {
          showAdminDashboard();
        }
      } else {
        showError(
          data.error || "Invalid username or password. Please try again."
        );
      }
    })
    .catch((error) => {
      console.error("Login error:", error);
      showError("Login failed. Please check your credentials and try again.");
    });
}

function handleSignup(event) {
  event.preventDefault();

  const username = document.getElementById("signupUsername").value.trim();
  const password = document.getElementById("signupPassword").value.trim();
  const fullName = document.getElementById("signupFullName").value.trim();
  const email = document.getElementById("signupEmail").value.trim();
  const rollNumber = document.getElementById("signupRollNumber").value.trim();
  const branch = document.getElementById("signupBranch").value;
  const prnNumber = document.getElementById("signupPrnNumber").value.trim();

  // Clear previous error messages
  hideSignupError();

  // Register new user via backend API
  fetch(`${API_BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: username,
      password: password,
      fullName: fullName,
      email: email,
      rollNumber: rollNumber,
      branch: branch,
      prnNumber: prnNumber,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.id) {
        // Successful registration
        alert("Account created successfully! You can now login.");
        document.getElementById("signupForm").reset();
        backToLoginForm();
      } else {
        showSignupError(data.error || "Registration failed. Please try again.");
      }
    })
    .catch((error) => {
      console.error("Registration error:", error);
      showSignupError("Registration failed. Please try again.");
    });
}

function handleLogout() {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("username");
  localStorage.removeItem("userRole");
  localStorage.removeItem("userFullName");
  selectedRole = null;
  showLoginPage();
}

function showError(message) {
  const errorMessage = document.getElementById("errorMessage");
  errorMessage.textContent = message;
  errorMessage.classList.remove("d-none");
}

function hideError() {
  const errorMessage = document.getElementById("errorMessage");
  errorMessage.classList.add("d-none");
}

function showSignupError(message) {
  const signupErrorMessage = document.getElementById("signupErrorMessage");
  signupErrorMessage.textContent = message;
  signupErrorMessage.classList.remove("d-none");
}

function hideSignupError() {
  const signupErrorMessage = document.getElementById("signupErrorMessage");
  signupErrorMessage.classList.add("d-none");
}

function updateWelcomeMessage() {
  const username = localStorage.getItem("username");
  const welcomeElement = document.querySelector(".welcome-message");
  if (welcomeElement && username) {
    welcomeElement.textContent = `Welcome back, ${username}!`;
  }
}

// ==================== ADMIN DASHBOARD FUNCTIONS ====================

// Load events for admin dashboard
function loadAdminEvents() {
  const container = document.getElementById("adminEventsContainer");
  if (!container) return;

  container.innerHTML = "";

  eventsData.forEach((event, index) => {
    const eventCard = createAdminEventCard(event, index);
    container.appendChild(eventCard);
  });
}

// Load clubs for admin dashboard
function loadAdminClubs() {
  const container = document.getElementById("adminClubsContainer");
  if (!container) return;

  container.innerHTML = "";

  clubsData.forEach((club, index) => {
    const clubCard = createAdminClubCard(club, index);
    container.appendChild(clubCard);
  });
}

// Load form submissions
function loadFormSubmissions() {
  const tbody = document.getElementById("formSubmissionsBody");
  if (!tbody) return;

  tbody.innerHTML = "";

  if (formSubmissions.length === 0) {
    tbody.innerHTML =
      '<tr><td colspan="11" class="text-center text-muted">No submissions yet</td></tr>';
    return;
  }

  formSubmissions.forEach((submission, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${submission.name}</td>
      <td>${submission.rollNumber}</td>
      <td>${submission.branch}</td>
      <td>${submission.prnNumber}</td>
      <td>${submission.club}</td>
      <td>₹${submission.fees || "-"}</td>
      <td>
        <span class="badge bg-${
          submission.paymentStatus === "completed" ? "success" : "warning"
        }">
          ${submission.paymentStatus || "pending"}
        </span>
        ${
          submission.transactionId
            ? `<br><small class="text-muted">${submission.transactionId}</small>`
            : ""
        }
      </td>
      <td>${submission.submittedOn}</td>
      <td>
        <span class="badge bg-${
          submission.status === "approved"
            ? "success"
            : submission.status === "rejected"
            ? "danger"
            : "warning"
        }">
          ${submission.status}
        </span>
      </td>
      <td>
        ${
          submission.status === "pending"
            ? `
          <button class="btn btn-sm btn-success me-1" onclick="approveSubmission(${index})">
            <i class="bi bi-check-circle"></i>
          </button>
          <button class="btn btn-sm btn-danger" onclick="rejectSubmission(${index})">
            <i class="bi bi-x-circle"></i>
          </button>
        `
            : "-"
        }
      </td>
    `;
    tbody.appendChild(row);
  });
}

// Create admin event card with edit/delete buttons
function createAdminEventCard(event, index) {
  const colDiv = document.createElement("div");
  colDiv.className = "col-lg-4 col-md-6 mb-4";

  colDiv.innerHTML = `
    <div class="card h-100 shadow-sm" style="border-left: 4px solid var(--bs-${
      event.color
    });">
      <div class="card-header bg-${
        event.color
      } text-white d-flex justify-content-between align-items-center">
        <h6 class="card-title mb-0">
          <i class="${event.icon} me-2"></i>${event.title}
        </h6>
      </div>
      <div class="card-body">
        <p class="card-text mb-1"><strong>Club:</strong> ${event.club}</p>
        <p class="card-text mb-1"><strong>Date:</strong> ${event.date}</p>
        <p class="card-text mb-1"><strong>Time:</strong> ${event.time}</p>
        <p class="card-text mb-1"><strong>Location:</strong> ${
          event.location
        }</p>
        <p class="card-text small">${event.description.substring(0, 100)}...</p>
        <span class="badge bg-${event.color}">${event.status}</span>
      </div>
      <div class="card-footer bg-white d-flex justify-content-between">
        <button class="btn btn-sm btn-primary" onclick="editEvent(${index})">
          <i class="bi bi-pencil"></i> Edit
        </button>
        <button class="btn btn-sm btn-danger" onclick="deleteEvent(${index})">
          <i class="bi bi-trash"></i> Delete
        </button>
      </div>
    </div>
  `;

  return colDiv;
}

// Create admin club card with edit/delete buttons
function createAdminClubCard(club, index) {
  const colDiv = document.createElement("div");
  colDiv.className = "col-lg-4 col-md-6 mb-4";

  colDiv.innerHTML = `
    <div class="card h-100 shadow-sm" style="border-left: 4px solid var(--bs-${club.color});">
      <div class="card-header bg-${club.color} text-white">
        <h6 class="card-title mb-0">
          <i class="${club.icon} me-2"></i>${club.name}
        </h6>
      </div>
      <div class="card-body">
        <p class="card-text small mb-1">${club.description}</p>
        <p class="card-text mb-1"><strong>President:</strong> ${club.president}</p>
        <p class="card-text mb-1"><strong>Members:</strong> ${club.members}</p>
        <p class="card-text mb-1"><strong>Category:</strong> ${club.category}</p>
      </div>
      <div class="card-footer bg-white d-flex justify-content-between">
        <button class="btn btn-sm btn-primary" onclick="editClub(${index})">
          <i class="bi bi-pencil"></i> Edit
        </button>
        <button class="btn btn-sm btn-danger" onclick="deleteClub(${index})">
          <i class="bi bi-trash"></i> Delete
        </button>
      </div>
    </div>
  `;

  return colDiv;
}

// Event CRUD operations
function showAddEventModal() {
  document.getElementById("eventModalTitle").textContent = "Add New Event";
  document.getElementById("eventIndex").value = "";
  document.getElementById("eventForm").reset();
  new bootstrap.Modal(document.getElementById("eventModal")).show();
}

function editEvent(index) {
  const event = eventsData[index];
  document.getElementById("eventModalTitle").textContent = "Edit Event";
  document.getElementById("eventIndex").value = index;
  document.getElementById("eventTitle").value = event.title;
  document.getElementById("eventClub").value = event.club;
  document.getElementById("eventDate").value = event.date;
  document.getElementById("eventTime").value = event.time;
  document.getElementById("eventLocation").value = event.location;
  document.getElementById("eventDescription").value = event.description;
  document.getElementById("eventStatus").value = event.status;
  new bootstrap.Modal(document.getElementById("eventModal")).show();
}

function saveEvent() {
  const index = document.getElementById("eventIndex").value;
  const event = {
    title: document.getElementById("eventTitle").value,
    club: document.getElementById("eventClub").value,
    date: document.getElementById("eventDate").value,
    time: document.getElementById("eventTime").value,
    location: document.getElementById("eventLocation").value,
    description: document.getElementById("eventDescription").value,
    status: document.getElementById("eventStatus").value,
    icon: "bi-calendar-event",
    color: "primary",
  };

  const isUpdate = index !== "";
  const url = isUpdate
    ? `${API_BASE_URL}/events/${eventsData[parseInt(index)].id}`
    : `${API_BASE_URL}/events`;
  const method = isUpdate ? "PUT" : "POST";

  fetch(url, {
    method: method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(event),
  })
    .then((response) => response.json())
    .then(async () => {
      await loadDataFromStorage();
      loadAdminEvents();
      bootstrap.Modal.getInstance(document.getElementById("eventModal")).hide();
      alert(
        "Event saved successfully! Changes will appear on student dashboard."
      );
    })
    .catch((error) => {
      console.error("Error saving event:", error);
      alert("Error saving event. Please try again.");
    });
}

function deleteEvent(index) {
  if (confirm("Are you sure you want to delete this event?")) {
    const eventId = eventsData[index].id;

    fetch(`${API_BASE_URL}/events/${eventId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(async () => {
        await loadDataFromStorage();
        loadAdminEvents();
        alert(
          "Event deleted successfully! Changes will appear on student dashboard."
        );
      })
      .catch((error) => {
        console.error("Error deleting event:", error);
        alert("Error deleting event. Please try again.");
      });
  }
}

// Club CRUD operations
function showAddClubModal() {
  document.getElementById("clubModalTitle").textContent = "Add New Club";
  document.getElementById("clubIndex").value = "";
  document.getElementById("clubForm").reset();
  new bootstrap.Modal(document.getElementById("clubModal")).show();
}

function editClub(index) {
  const club = clubsData[index];
  document.getElementById("clubModalTitle").textContent = "Edit Club";
  document.getElementById("clubIndex").value = index;
  document.getElementById("clubName").value = club.name;
  document.getElementById("clubDescription").value = club.description;
  document.getElementById("clubPresident").value = club.president;
  document.getElementById("clubMembers").value = club.members;
  document.getElementById("clubCategory").value = club.category;
  document.getElementById("clubFounded").value = club.founded;
  document.getElementById("clubFocusArea").value = club.focusArea;
  new bootstrap.Modal(document.getElementById("clubModal")).show();
}

function saveClub() {
  const index = document.getElementById("clubIndex").value;
  const club = {
    name: document.getElementById("clubName").value,
    description: document.getElementById("clubDescription").value,
    president: document.getElementById("clubPresident").value,
    members: parseInt(document.getElementById("clubMembers").value),
    category: document.getElementById("clubCategory").value,
    founded: document.getElementById("clubFounded").value,
    focusArea: document.getElementById("clubFocusArea").value,
    icon: "bi-people",
    color: "primary",
    activities: ["Member activities"],
    outcomes: ["Key outcomes"],
    meetingDay: "TBD",
    meetingTime: "TBD",
    location: "TBD",
    fees: 300,
  };

  const isUpdate = index !== "";
  const url = isUpdate
    ? `${API_BASE_URL}/clubs/${clubsData[parseInt(index)].id}`
    : `${API_BASE_URL}/clubs`;
  const method = isUpdate ? "PUT" : "POST";

  fetch(url, {
    method: method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(club),
  })
    .then((response) => response.json())
    .then(async () => {
      await loadDataFromStorage();
      loadAdminClubs();
      populateClubDropdown();
      bootstrap.Modal.getInstance(document.getElementById("clubModal")).hide();
      alert(
        "Club saved successfully! Changes will appear on student dashboard."
      );
    })
    .catch((error) => {
      console.error("Error saving club:", error);
      alert("Error saving club. Please try again.");
    });
}

function deleteClub(index) {
  if (confirm("Are you sure you want to delete this club?")) {
    const clubId = clubsData[index].id;

    fetch(`${API_BASE_URL}/clubs/${clubId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(async () => {
        await loadDataFromStorage();
        loadAdminClubs();
        populateClubDropdown();
        alert(
          "Club deleted successfully! Changes will appear on student dashboard."
        );
      })
      .catch((error) => {
        console.error("Error deleting club:", error);
        alert("Error deleting club. Please try again.");
      });
  }
}

// Form submission management
function populateClubDropdown() {
  const select = document.getElementById("clubToJoin");
  if (!select) return;

  // Clear existing options except the first one
  select.innerHTML = '<option value="">Choose a club...</option>';

  clubsData.forEach((club) => {
    const option = document.createElement("option");
    option.value = club.name;
    option.textContent = club.name;
    select.appendChild(option);
  });
}

// Store current form data for payment
let currentFormSubmission = null;

// Update club fees display when club is selected
function updateClubFees() {
  const clubSelect = document.getElementById("clubToJoin");
  const feesSection = document.getElementById("feesSection");
  const clubFeesDisplay = document.getElementById("clubFees");

  if (clubSelect.value) {
    const selectedClub = clubsData.find(
      (club) => club.name === clubSelect.value
    );
    if (selectedClub && selectedClub.fees) {
      clubFeesDisplay.textContent = selectedClub.fees;
      feesSection.classList.remove("d-none");
    }
  } else {
    feesSection.classList.add("d-none");
  }
}

function submitJoinClubForm() {
  const form = document.getElementById("joinClubForm");
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const clubName = document.getElementById("clubToJoin").value;
  const selectedClub = clubsData.find((club) => club.name === clubName);

  // Store submission data
  currentFormSubmission = {
    name: document.getElementById("studentName").value,
    rollNumber: document.getElementById("rollNumber").value,
    branch: document.getElementById("branch").value,
    prnNumber: document.getElementById("prnNumber").value,
    club: clubName,
    fees: selectedClub.fees,
    submittedOn: new Date().toLocaleString(),
    status: "pending",
    paymentStatus: "pending",
  };

  // Show payment modal
  showPaymentModal();
}

function showPaymentModal() {
  // Hide join club modal
  const joinModal = bootstrap.Modal.getInstance(
    document.getElementById("joinClubModal")
  );
  if (joinModal) joinModal.hide();

  // Update payment modal details
  document.getElementById("paymentClubName").textContent =
    currentFormSubmission.club;
  document.getElementById("paymentStudentName").textContent =
    currentFormSubmission.name;
  document.getElementById("paymentRollNumber").textContent =
    currentFormSubmission.rollNumber;
  document.getElementById("paymentAmount").textContent =
    currentFormSubmission.fees;

  // Show payment modal
  const paymentModal = new bootstrap.Modal(
    document.getElementById("paymentModal")
  );
  paymentModal.show();
}

function processPayment() {
  const selectedPaymentMethod = document.querySelector(
    'input[name="paymentMethod"]:checked'
  ).value;

  // Hide payment modal
  const paymentModal = bootstrap.Modal.getInstance(
    document.getElementById("paymentModal")
  );
  if (paymentModal) paymentModal.hide();

  // Show processing modal
  const processingModal = new bootstrap.Modal(
    document.getElementById("processingModal")
  );
  processingModal.show();

  // Simulate payment processing
  setTimeout(() => {
    // Hide processing modal
    processingModal.hide();

    // Generate transaction ID
    const transactionId =
      "TXN" +
      new Date().getFullYear() +
      String(new Date().getMonth() + 1).padStart(2, "0") +
      String(new Date().getDate()).padStart(2, "0") +
      Math.random().toString(36).substring(2, 8).toUpperCase();

    // Update submission with payment details
    currentFormSubmission.paymentStatus = "completed";
    currentFormSubmission.paymentMethod = selectedPaymentMethod;
    currentFormSubmission.transactionId = transactionId;
    currentFormSubmission.paidAmount = currentFormSubmission.fees;
    currentFormSubmission.paymentDate = new Date().toLocaleString();

    // Save to backend
    fetch(`${API_BASE_URL}/form-submissions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(currentFormSubmission),
    })
      .then((response) => response.json())
      .then(() => {
        // Show transaction ID
        document.getElementById("transactionId").textContent = transactionId;

        // Show success modal
        const successModal = new bootstrap.Modal(
          document.getElementById("successModal")
        );
        successModal.show();

        // Reset form
        document.getElementById("joinClubForm").reset();
        document.getElementById("feesSection").classList.add("d-none");
        currentFormSubmission = null;
      })
      .catch((error) => {
        console.error("Error saving submission:", error);
        alert("Payment processed but error saving data. Please contact admin.");
      });
  }, 2000);
}

function closeAllModals() {
  // Close all modals
  const modals = document.querySelectorAll(".modal");
  modals.forEach((modal) => {
    const modalInstance = bootstrap.Modal.getInstance(modal);
    if (modalInstance) {
      modalInstance.hide();
    }
  });

  // Remove all modal backdrops
  const backdrops = document.querySelectorAll(".modal-backdrop");
  backdrops.forEach((backdrop) => backdrop.remove());

  // Reset body styles
  document.body.classList.remove("modal-open");
  document.body.style.overflow = "";
  document.body.style.paddingRight = "";
}

function approveSubmission(index) {
  const submissionId = formSubmissions[index].id;

  fetch(`${API_BASE_URL}/form-submissions/${submissionId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: "approved" }),
  })
    .then((response) => response.json())
    .then(async () => {
      await loadDataFromStorage();
      loadFormSubmissions();
      alert("Submission approved!");
    })
    .catch((error) => {
      console.error("Error approving submission:", error);
      alert("Error approving submission. Please try again.");
    });
}

function rejectSubmission(index) {
  const submissionId = formSubmissions[index].id;

  fetch(`${API_BASE_URL}/form-submissions/${submissionId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: "rejected" }),
  })
    .then((response) => response.json())
    .then(async () => {
      await loadDataFromStorage();
      loadFormSubmissions();
      alert("Submission rejected!");
    })
    .catch((error) => {
      console.error("Error rejecting submission:", error);
      alert("Error rejecting submission. Please try again.");
    });
}

// Load event registrations for admin dashboard
function loadEventRegistrations() {
  const tbody = document.getElementById("eventRegistrationsBody");
  if (!tbody) return;

  tbody.innerHTML = "";

  if (eventRegistrations.length === 0) {
    tbody.innerHTML =
      '<tr><td colspan="12" class="text-center text-muted">No event registrations yet</td></tr>';
    return;
  }

  eventRegistrations.forEach((registration, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${registration.name}</td>
      <td>${registration.rollNumber}</td>
      <td>${registration.branch}</td>
      <td>${registration.prnNumber}</td>
      <td>${registration.eventName}</td>
      <td>${registration.eventDate}</td>
      <td>₹${registration.registrationFee || "-"}</td>
      <td>
        <span class="badge bg-${
          registration.paymentStatus === "completed" ? "success" : "warning"
        }">
          ${registration.paymentStatus || "pending"}
        </span>
        ${
          registration.transactionId
            ? `<br><small class="text-muted">${registration.transactionId}</small>`
            : ""
        }
      </td>
      <td>${registration.submittedOn}</td>
      <td>
        <span class="badge bg-${
          registration.status === "confirmed"
            ? "success"
            : registration.status === "cancelled"
            ? "danger"
            : "warning"
        }">
          ${registration.status}
        </span>
      </td>
      <td>
        ${
          registration.status === "confirmed"
            ? `
          <button class="btn btn-sm btn-danger" onclick="cancelEventRegistration(${index})">
            <i class="bi bi-x-circle"></i>
          </button>
        `
            : "-"
        }
      </td>
    `;
    tbody.appendChild(row);
  });
}

// Cancel event registration
function cancelEventRegistration(index) {
  if (confirm("Are you sure you want to cancel this event registration?")) {
    const registrationId = eventRegistrations[index].id;

    fetch(`${API_BASE_URL}/event-registrations/${registrationId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "cancelled" }),
    })
      .then((response) => response.json())
      .then(async () => {
        await loadDataFromStorage();
        loadEventRegistrations();
        alert("Event registration cancelled!");
      })
      .catch((error) => {
        console.error("Error cancelling registration:", error);
        alert("Error cancelling registration. Please try again.");
      });
  }
}

// ==================== STUDENT DASHBOARD FUNCTIONS ====================

// Load events with animation
function loadEventsWithAnimation() {
  console.log(
    "📅 loadEventsWithAnimation called, events count:",
    eventsData.length
  );
  console.log("📅 eventsContainer exists:", !!eventsContainer);

  if (!eventsContainer) return;
  eventsContainer.innerHTML = "";

  eventsData.forEach((event, index) => {
    setTimeout(() => {
      console.log(`📅 Creating event card ${index + 1}:`, event.title);
      const eventCard = createEventCard(event, index);
      eventsContainer.appendChild(eventCard);
    }, index * 150);
  });
}

// Load clubs with animation
function loadClubsWithAnimation() {
  console.log(
    "🏫 loadClubsWithAnimation called, clubs count:",
    clubsData.length
  );
  console.log("🏫 clubsContainer exists:", !!clubsContainer);

  if (!clubsContainer) return;
  clubsContainer.innerHTML = "";

  clubsData.forEach((club, index) => {
    setTimeout(() => {
      console.log(`🏫 Creating club card ${index + 1}:`, club.name);
      const clubCard = createEnhancedClubCard(club, index);
      clubsContainer.appendChild(clubCard);
    }, index * 200);
  });
}

// Load members with animation
function loadMembersWithAnimation() {
  console.log(
    "👥 loadMembersWithAnimation called, members count:",
    membersData.length
  );
  console.log("👥 membersContainer exists:", !!membersContainer);

  if (!membersContainer) return;
  membersContainer.innerHTML = "";

  membersData.forEach((member, index) => {
    setTimeout(() => {
      console.log(`👥 Creating member card ${index + 1}:`, member.name);
      const memberCard = createMemberCard(member, index);
      membersContainer.appendChild(memberCard);
    }, index * 150);
  });
}

// Create event card
function createEventCard(event, index) {
  const colDiv = document.createElement("div");
  colDiv.className = "col-lg-4 col-md-6 mb-4";

  colDiv.innerHTML = `
    <div class="card h-100 shadow-sm" style="border-left: 4px solid var(--bs-${event.color});">
      <div class="card-header bg-${event.color} text-white">
        <h5 class="card-title mb-0">
          <i class="${event.icon} me-2"></i>${event.title}
        </h5>
      </div>
      <div class="card-body">
        <p class="card-text mb-2"><strong>Club:</strong> ${event.club}</p>
        <p class="card-text mb-2"><strong>Date:</strong> ${event.date}</p>
        <p class="card-text mb-2"><strong>Time:</strong> ${event.time}</p>
        <p class="card-text mb-2"><strong>Location:</strong> ${event.location}</p>
        <p class="card-text">${event.description}</p>
        <div class="d-flex justify-content-between align-items-center mt-3">
          <span class="badge bg-${event.color}">${event.status}</span>
          <div>
            <button class="btn btn-${event.color} btn-sm me-2" onclick="showEventDetails('${event.title}')">
              <i class="bi bi-eye me-1"></i>Details
            </button>
            <button class="btn btn-success btn-sm" onclick="openEventRegistration(${index})">
              <i class="bi bi-person-plus me-1"></i>Register
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  return colDiv;
}

// Create enhanced club card with focus area, activities, and outcomes
function createEnhancedClubCard(club, index) {
  const colDiv = document.createElement("div");
  colDiv.className = "col-lg-4 col-md-6 mb-4";

  colDiv.innerHTML = `
    <div class="card h-100 shadow-lg border-0" style="border-left: 5px solid var(--bs-${
      club.color
    }) !important; border-radius: 15px;">
      <div class="card-header bg-${
        club.color
      } text-white" style="border-radius: 15px 15px 0 0;">
        <div class="d-flex align-items-center">
          <div class="me-3">
            <i class="${club.icon}" style="font-size: 2.5rem;"></i>
          </div>
          <div>
            <h5 class="card-title mb-1 fw-bold">${club.name}</h5>
            <small class="text-white-50">${club.category} • ${
    club.members
  } Members</small>
          </div>
        </div>
      </div>
      <div class="card-body p-4">
        <!-- Focus Area -->
        <div class="mb-3">
          <h6 class="text-${club.color} fw-bold mb-2">
            <i class="bi bi-bullseye me-2"></i>Focus Area
          </h6>
          <p class="text-muted small">${club.focusArea}</p>
        </div>
        
        <!-- Description -->
        <div class="mb-3">
          <p class="card-text text-dark">${club.description}</p>
        </div>
        
        <!-- Activities -->
        <div class="mb-3">
          <h6 class="text-${club.color} fw-bold mb-2">
            <i class="bi bi-lightning me-2"></i>Key Activities
          </h6>
          <div class="d-flex flex-wrap gap-1">
            ${club.activities
              .slice(0, 3)
              .map(
                (activity) =>
                  `<span class="badge bg-${club.color} bg-opacity-10 text-${club.color} small px-2 py-1">${activity}</span>`
              )
              .join("")}
            ${
              club.activities.length > 3
                ? `<span class="badge bg-secondary bg-opacity-10 text-secondary small px-2 py-1">+${
                    club.activities.length - 3
                  } more</span>`
                : ""
            }
          </div>
        </div>
        
        <!-- Key Outcomes -->
        <div class="mb-4">
          <h6 class="text-${club.color} fw-bold mb-2">
            <i class="bi bi-trophy me-2"></i>Key Outcomes
          </h6>
          <div class="outcomes-list">
            ${club.outcomes
              .slice(0, 3)
              .map(
                (outcome) =>
                  `<div class="d-flex align-items-center mb-1">
                <i class="bi bi-check-circle-fill text-success me-2" style="font-size: 0.8rem;"></i>
                <small class="text-muted">${outcome}</small>
              </div>`
              )
              .join("")}
            ${
              club.outcomes.length > 3
                ? `<div class="d-flex align-items-center mb-1">
                <i class="bi bi-plus-circle text-secondary me-2" style="font-size: 0.8rem;"></i>
                <small class="text-secondary">${
                  club.outcomes.length - 3
                } more achievements</small>
              </div>`
                : ""
            }
          </div>
        </div>
        
        <!-- Meeting Info & Action -->
        <div class="d-flex justify-content-between align-items-center">
          <div class="text-center">
            <small class="text-muted d-block">Founded ${club.founded}</small>
            <small class="text-${club.color}">${club.meetingDay}s ${
    club.meetingTime
  }</small>
          </div>
          <button class="btn btn-${
            club.color
          } btn-sm px-3 shadow-sm" onclick="showClubDetails('${club.name}')">
            <i class="bi bi-people me-1"></i>Join Club
          </button>
        </div>
      </div>
    </div>
  `;

  return colDiv;
}

// Create member card
function createMemberCard(member, index) {
  const colDiv = document.createElement("div");
  colDiv.className = "col-lg-4 col-md-6 mb-4";

  colDiv.innerHTML = `
    <div class="card h-100 shadow-sm" style="border-left: 4px solid var(--bs-${
      member.color
    });">
      <div class="card-header bg-${member.color} text-white text-center">
        <i class="${member.avatar}" style="font-size: 3rem;"></i>
        <h5 class="card-title mb-0 mt-2">${member.name}</h5>
      </div>
      <div class="card-body">
        <p class="card-text mb-2"><strong>Role:</strong> ${member.role}</p>
        <p class="card-text mb-2"><strong>Club:</strong> ${member.club}</p>
        <p class="card-text mb-2"><strong>Year:</strong> ${member.year}</p>
        <p class="card-text mb-2"><strong>Major:</strong> ${member.major}</p>
        <p class="card-text mb-3"><strong>Email:</strong> ${member.email}</p>
        <div class="mb-3">
          <strong>Achievements:</strong>
          <div class="mt-1">
            ${member.achievements
              .map(
                (achievement) =>
                  `<span class="badge bg-light text-dark me-1 mb-1">${achievement}</span>`
              )
              .join("")}
          </div>
        </div>
        <button class="btn btn-${
          member.color
        } btn-sm w-100" onclick="showMemberDetails(${member.id})">
          View Profile
        </button>
      </div>
    </div>
  `;

  return colDiv;
}

// Simple modal functions
function showEventDetails(eventTitle) {
  const event = eventsData.find((e) => e.title === eventTitle);
  if (!event) return;

  alert(
    `Event: ${event.title}\nDate: ${event.date}\nTime: ${event.time}\nLocation: ${event.location}\nDescription: ${event.description}`
  );
}

function showClubDetails(clubName) {
  const club = clubsData.find((c) => c.name === clubName);
  if (!club) return;

  const activitiesText = club.activities.join(", ");
  const outcomesText = club.outcomes.join("\n• ");

  alert(
    `Club: ${club.name}\n\nFocus Area: ${club.focusArea}\n\nPresident: ${club.president}\nMembers: ${club.members}\nFounded: ${club.founded}\n\nDescription: ${club.description}\n\nKey Activities:\n• ${activitiesText}\n\nKey Outcomes:\n• ${outcomesText}\n\nMeeting: ${club.meetingDay}s at ${club.meetingTime}\nLocation: ${club.location}`
  );
}

function showMemberDetails(memberId) {
  const member = membersData.find((m) => m.id === memberId);
  if (!member) return;

  alert(
    `Member: ${member.name}\nRole: ${member.role}\nClub: ${member.club}\nYear: ${member.year}\nMajor: ${member.major}\nEmail: ${member.email}`
  );
}

function sendMessage(memberId) {
  const member = membersData.find((m) => m.id === memberId);
  if (!member) return;

  alert(`Sending message to ${member.name} at ${member.email}`);
}

// Utility function
function capitalizeFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// ==================== EVENT REGISTRATION FUNCTIONS ====================

// Open event registration modal
function openEventRegistration(eventIndex) {
  const event = eventsData[eventIndex];
  if (!event) return;

  // Set event name in the form
  document.getElementById("eventRegEventName").value = event.title;

  // Store event index for later use
  document.getElementById("eventRegistrationForm").dataset.eventIndex =
    eventIndex;

  // Show the modal
  const modal = new bootstrap.Modal(
    document.getElementById("eventRegistrationModal")
  );
  modal.show();
}

// Store current event registration data
let currentEventRegistration = null;

// Submit event registration
function submitEventRegistration() {
  const form = document.getElementById("eventRegistrationForm");
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const eventIndex = parseInt(form.dataset.eventIndex);
  const event = eventsData[eventIndex];
  const selectedPaymentMethod = document.querySelector(
    'input[name="eventPaymentMethod"]:checked'
  ).value;

  // Store registration data
  currentEventRegistration = {
    name: document.getElementById("eventRegStudentName").value,
    rollNumber: document.getElementById("eventRegRollNumber").value,
    branch: document.getElementById("eventRegBranch").value,
    prnNumber: document.getElementById("eventRegPrnNumber").value,
    eventName: event.title,
    eventDate: event.date,
    eventTime: event.time,
    eventLocation: event.location,
    registrationFee: parseInt(
      document.getElementById("eventRegFee").textContent
    ),
    paymentMethod: selectedPaymentMethod,
    submittedOn: new Date().toLocaleString(),
    status: "pending",
    paymentStatus: "pending",
  };

  // Hide event registration modal
  const eventModal = bootstrap.Modal.getInstance(
    document.getElementById("eventRegistrationModal")
  );
  if (eventModal) eventModal.hide();

  // Show processing modal
  const processingModal = new bootstrap.Modal(
    document.getElementById("processingModal")
  );
  processingModal.show();

  // Simulate payment processing
  setTimeout(() => {
    // Hide processing modal
    processingModal.hide();

    // Generate transaction ID
    const transactionId =
      "EVT" +
      new Date().getFullYear() +
      String(new Date().getMonth() + 1).padStart(2, "0") +
      String(new Date().getDate()).padStart(2, "0") +
      Math.random().toString(36).substring(2, 8).toUpperCase();

    // Update registration with payment details
    currentEventRegistration.paymentStatus = "completed";
    currentEventRegistration.transactionId = transactionId;
    currentEventRegistration.paidAmount =
      currentEventRegistration.registrationFee;
    currentEventRegistration.paymentDate = new Date().toLocaleString();
    currentEventRegistration.status = "confirmed";

    // Save to backend
    fetch(`${API_BASE_URL}/event-registrations`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(currentEventRegistration),
    })
      .then((response) => response.json())
      .then(() => {
        // Show transaction ID
        document.getElementById("transactionId").textContent = transactionId;

        // Show success modal
        const successModal = new bootstrap.Modal(
          document.getElementById("successModal")
        );
        successModal.show();

        // Reset form
        document.getElementById("eventRegistrationForm").reset();
        currentEventRegistration = null;
      })
      .catch((error) => {
        console.error("Error saving registration:", error);
        alert("Payment processed but error saving data. Please contact admin.");
      });
  }, 2000);
}

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname));

// Initialize SQLite Database
const db = new sqlite3.Database("./database/rcpit_cms.db", (err) => {
  if (err) {
    console.error("Error opening database:", err);
  } else {
    console.log("✅ Connected to SQLite database");
    initializeDatabase();
  }
});

// Create tables if they don't exist
function initializeDatabase() {
  db.serialize(() => {
    // Users table for registration
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      full_name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      roll_number TEXT,
      branch TEXT,
      prn_number TEXT,
      role TEXT DEFAULT 'student',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Events table
    db.run(`CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      club TEXT NOT NULL,
      date TEXT NOT NULL,
      time TEXT NOT NULL,
      location TEXT NOT NULL,
      description TEXT,
      status TEXT DEFAULT 'upcoming',
      icon TEXT DEFAULT 'bi-calendar-event',
      color TEXT DEFAULT 'primary',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Clubs table
    db.run(`CREATE TABLE IF NOT EXISTS clubs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      description TEXT,
      president TEXT,
      members INTEGER DEFAULT 0,
      founded TEXT,
      category TEXT,
      focus_area TEXT,
      icon TEXT DEFAULT 'bi-people',
      color TEXT DEFAULT 'primary',
      activities TEXT,
      outcomes TEXT,
      meeting_day TEXT,
      meeting_time TEXT,
      location TEXT,
      fees INTEGER DEFAULT 300,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Form submissions table (club joining)
    db.run(`CREATE TABLE IF NOT EXISTS form_submissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      roll_number TEXT NOT NULL,
      branch TEXT NOT NULL,
      prn_number TEXT NOT NULL,
      club TEXT NOT NULL,
      fees INTEGER,
      payment_status TEXT DEFAULT 'pending',
      payment_method TEXT,
      transaction_id TEXT,
      paid_amount INTEGER,
      payment_date TEXT,
      submitted_on TEXT NOT NULL,
      status TEXT DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Event registrations table
    db.run(`CREATE TABLE IF NOT EXISTS event_registrations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      roll_number TEXT NOT NULL,
      branch TEXT NOT NULL,
      prn_number TEXT NOT NULL,
      event_name TEXT NOT NULL,
      event_date TEXT,
      event_time TEXT,
      event_location TEXT,
      registration_fee INTEGER DEFAULT 100,
      payment_status TEXT DEFAULT 'pending',
      payment_method TEXT,
      transaction_id TEXT,
      paid_amount INTEGER,
      payment_date TEXT,
      submitted_on TEXT NOT NULL,
      status TEXT DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    console.log("✅ Database tables initialized");
  });
}

// ==================== USER AUTHENTICATION API ====================

// Register new user
app.post("/api/register", (req, res) => {
  const { username, password, fullName, email, rollNumber, branch, prnNumber } =
    req.body;

  db.run(
    `INSERT INTO users (username, password, full_name, email, roll_number, branch, prn_number, role)
     VALUES (?, ?, ?, ?, ?, ?, ?, 'student')`,
    [username, password, fullName, email, rollNumber, branch, prnNumber],
    function (err) {
      if (err) {
        if (err.message.includes("UNIQUE constraint failed")) {
          res.status(400).json({ error: "Username or email already exists" });
        } else {
          res.status(500).json({ error: err.message });
        }
        return;
      }
      res.json({ id: this.lastID, message: "User registered successfully" });
    }
  );
});

// Login user
app.post("/api/login", (req, res) => {
  const { username, password, role } = req.body;

  // Check for default admin credentials
  if (role === "admin" && username === "admin" && password === "admin123") {
    return res.json({
      success: true,
      user: {
        username: "admin",
        role: "admin",
        fullName: "Administrator",
      },
    });
  }

  // Check database for student users
  if (role === "student") {
    db.get(
      "SELECT * FROM users WHERE username=? AND password=? AND role=?",
      [username, password, "student"],
      (err, row) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        if (row) {
          res.json({
            success: true,
            user: {
              id: row.id,
              username: row.username,
              fullName: row.full_name,
              email: row.email,
              rollNumber: row.roll_number,
              branch: row.branch,
              prnNumber: row.prn_number,
              role: row.role,
            },
          });
        } else {
          res
            .status(401)
            .json({ success: false, error: "Invalid credentials" });
        }
      }
    );
  } else {
    res.status(401).json({ success: false, error: "Invalid credentials" });
  }
});

// ==================== EVENTS API ====================

// Get all events
app.get("/api/events", (req, res) => {
  db.all("SELECT * FROM events ORDER BY created_at DESC", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Add new event
app.post("/api/events", (req, res) => {
  const {
    title,
    club,
    date,
    time,
    location,
    description,
    status,
    icon,
    color,
  } = req.body;

  db.run(
    `INSERT INTO events (title, club, date, time, location, description, status, icon, color)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      title,
      club,
      date,
      time,
      location,
      description,
      status,
      icon || "bi-calendar-event",
      color || "primary",
    ],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID, message: "Event added successfully" });
    }
  );
});

// Update event
app.put("/api/events/:id", (req, res) => {
  const { title, club, date, time, location, description, status } = req.body;

  db.run(
    `UPDATE events SET title=?, club=?, date=?, time=?, location=?, description=?, status=?
     WHERE id=?`,
    [title, club, date, time, location, description, status, req.params.id],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({
        message: "Event updated successfully",
        changes: this.changes,
      });
    }
  );
});

// Delete event
app.delete("/api/events/:id", (req, res) => {
  db.run("DELETE FROM events WHERE id=?", [req.params.id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: "Event deleted successfully", changes: this.changes });
  });
});

// ==================== CLUBS API ====================

// Get all clubs
app.get("/api/clubs", (req, res) => {
  db.all("SELECT * FROM clubs ORDER BY name", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    // Parse JSON fields
    const clubs = rows.map((club) => ({
      ...club,
      activities: club.activities ? JSON.parse(club.activities) : [],
      outcomes: club.outcomes ? JSON.parse(club.outcomes) : [],
    }));
    res.json(clubs);
  });
});

// Add new club
app.post("/api/clubs", (req, res) => {
  const {
    name,
    description,
    president,
    members,
    founded,
    category,
    focusArea,
    icon,
    color,
    activities,
    outcomes,
    meetingDay,
    meetingTime,
    location,
    fees,
  } = req.body;

  db.run(
    `INSERT INTO clubs (name, description, president, members, founded, category, focus_area, icon, color, activities, outcomes, meeting_day, meeting_time, location, fees)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      name,
      description,
      president,
      members,
      founded,
      category,
      focusArea,
      icon || "bi-people",
      color || "primary",
      JSON.stringify(activities || []),
      JSON.stringify(outcomes || []),
      meetingDay,
      meetingTime,
      location,
      fees || 300,
    ],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID, message: "Club added successfully" });
    }
  );
});

// Update club
app.put("/api/clubs/:id", (req, res) => {
  const {
    name,
    description,
    president,
    members,
    category,
    founded,
    focusArea,
    activities,
    outcomes,
    meetingDay,
    meetingTime,
    location,
    fees,
  } = req.body;

  db.run(
    `UPDATE clubs SET name=?, description=?, president=?, members=?, category=?, founded=?, focus_area=?, activities=?, outcomes=?, meeting_day=?, meeting_time=?, location=?, fees=?
     WHERE id=?`,
    [
      name,
      description,
      president,
      members,
      category,
      founded,
      focusArea,
      JSON.stringify(activities || []),
      JSON.stringify(outcomes || []),
      meetingDay,
      meetingTime,
      location,
      fees,
      req.params.id,
    ],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ message: "Club updated successfully", changes: this.changes });
    }
  );
});

// Delete club
app.delete("/api/clubs/:id", (req, res) => {
  db.run("DELETE FROM clubs WHERE id=?", [req.params.id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: "Club deleted successfully", changes: this.changes });
  });
});

// ==================== FORM SUBMISSIONS API ====================

// Get all form submissions
app.get("/api/form-submissions", (req, res) => {
  db.all(
    "SELECT * FROM form_submissions ORDER BY created_at DESC",
    [],
    (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(rows);
    }
  );
});

// Add new form submission
app.post("/api/form-submissions", (req, res) => {
  const {
    name,
    rollNumber,
    branch,
    prnNumber,
    club,
    fees,
    paymentStatus,
    paymentMethod,
    transactionId,
    paidAmount,
    paymentDate,
    submittedOn,
    status,
  } = req.body;

  db.run(
    `INSERT INTO form_submissions (name, roll_number, branch, prn_number, club, fees, payment_status, payment_method, transaction_id, paid_amount, payment_date, submitted_on, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      name,
      rollNumber,
      branch,
      prnNumber,
      club,
      fees,
      paymentStatus || "pending",
      paymentMethod,
      transactionId,
      paidAmount,
      paymentDate,
      submittedOn,
      status || "pending",
    ],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID, message: "Submission added successfully" });
    }
  );
});

// Update form submission status
app.put("/api/form-submissions/:id", (req, res) => {
  const { status } = req.body;

  db.run(
    "UPDATE form_submissions SET status=? WHERE id=?",
    [status, req.params.id],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({
        message: "Submission updated successfully",
        changes: this.changes,
      });
    }
  );
});

// ==================== EVENT REGISTRATIONS API ====================

// Get all event registrations
app.get("/api/event-registrations", (req, res) => {
  db.all(
    "SELECT * FROM event_registrations ORDER BY created_at DESC",
    [],
    (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(rows);
    }
  );
});

// Add new event registration
app.post("/api/event-registrations", (req, res) => {
  const {
    name,
    rollNumber,
    branch,
    prnNumber,
    eventName,
    eventDate,
    eventTime,
    eventLocation,
    registrationFee,
    paymentStatus,
    paymentMethod,
    transactionId,
    paidAmount,
    paymentDate,
    submittedOn,
    status,
  } = req.body;

  db.run(
    `INSERT INTO event_registrations (name, roll_number, branch, prn_number, event_name, event_date, event_time, event_location, registration_fee, payment_status, payment_method, transaction_id, paid_amount, payment_date, submitted_on, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      name,
      rollNumber,
      branch,
      prnNumber,
      eventName,
      eventDate,
      eventTime,
      eventLocation,
      registrationFee || 100,
      paymentStatus || "pending",
      paymentMethod,
      transactionId,
      paidAmount,
      paymentDate,
      submittedOn,
      status || "pending",
    ],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({
        id: this.lastID,
        message: "Event registration added successfully",
      });
    }
  );
});

// Update event registration status
app.put("/api/event-registrations/:id", (req, res) => {
  const { status } = req.body;

  db.run(
    "UPDATE event_registrations SET status=? WHERE id=?",
    [status, req.params.id],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({
        message: "Event registration updated successfully",
        changes: this.changes,
      });
    }
  );
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Database: SQLite (./database/rcpit_cms.db)`);
});

// Graceful shutdown
process.on("SIGINT", () => {
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log("\n✅ Database connection closed");
    process.exit(0);
  });
});

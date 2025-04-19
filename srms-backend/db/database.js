const sqlite3 = require('sqlite3').verbose(); // Import sqlite3 library

// Create or open a database in memory (you can replace ':memory:' with a file path to persist the data)
const db = new sqlite3.Database('./db/srms.db', (err) => {
  if (err) {
    console.error('Error opening the database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// Create the "users" table if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL
  )
`, (err) => {
  if (err) {
    console.error('Error creating users table:', err.message);
  }
});

// Create the "students" table if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    roll TEXT NOT NULL,
    department TEXT NOT NULL,
    year INTEGER NOT NULL,
    subjects TEXT,      -- Stored as JSON
    grades TEXT,        -- Stored as JSON
    attendance INTEGER  -- Stored as percentage
  )
`, (err) => {
  if (err) {
    console.error('Error creating students table:', err.message);
  }
});

// Export the db connection to use in other files
module.exports = db;

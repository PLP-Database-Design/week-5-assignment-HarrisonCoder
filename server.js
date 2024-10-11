require('dotenv').config(); // Ensure this is at the top

const express = require('express');
const mysql = require('mysql2');

const app = express();

// Create connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Test connection
db.connect((err) => {
  if (err) {
    return console.error('Failed to connect to database', err);
  }
  console.log('Database connected successfully', db.threadId);
});

// Basic endpoint
app.get('/', (req, res) => {
  res.send('Hello world! Let’s do more coding. It is always fun. Wow!');
});

//GET endpoint that retrieves all patients
app.get('/patients', (req, res) => {
  const getPatients = 'SELECT  patient_id, first_name, last_name, date_of_birth FROM patients;';
  db.query(getPatients, (err, data) => {
    // In case of error fetching from database
    if (err) {
      console.error('Error fetching patients:', err);
      return res.status(400).json('Error fetching from patients');
    }
    // When access to database is successful
    res.status(200).json(data);
  });
});


// GET endpoint that displays all providers details 
app.get('/providers', (req, res) => {
  const getProviders = 'SELECT   first_name, last_name, provider_specialty FROM providers;';
  db.query(getProviders, (err, data) => {
    // In case of error fetching from database
    if (err) {
      console.error('Error fetching patients:', err);
      return res.status(400).json('Error fetching from patients');
    }
    // When access to database is successful
    res.status(200).json(data);
  });
});


// GET endpoint that retrieves all patients by their first name
app.get('/first_name', (req, res) => {
  const getPatients = 'SELECT   first_name FROM patients;';
  db.query(getPatients, (err, data) => {
    // In case of error fetching from database
    if (err) {
      console.error('Error fetching patients:', err);
      return res.status(400).json('Error fetching from patients');
    }
    // When access to database is successful
    res.status(200).json(data);
  });
});











// Listen to the server
const PORT = 3300;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

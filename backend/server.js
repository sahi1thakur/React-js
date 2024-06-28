const express = require('express');
const bodyParser = require('body-parser');
const ldapAuth = require('./ldap');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors());

// MySQL database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'sahil', // Replace with your MySQL password
  database: 'quiz' // Replace with your database name
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// LDAP Authentication endpoint
app.post('/login', (req, res) => {
  const { username, password, ou } = req.body;
  console.log(`Received login request for username: ${username}`);

  ldapAuth(username, ou, password, (err, success) => {
    if (err || !success) {
      console.error('Authentication failed');
      return res.status(401).send('Authentication failed');
    }
    console.log('Authentication successful');
    return res.send('Authentication successful');
  });
});

// Endpoint to save quiz responses
app.post('/submit-quiz', (req, res) => {
  const { question, selectedOption, username } = req.body;

  const query = 'INSERT INTO responses ( question, selectedOption, username) VALUES (?, ?, ?)';
  db.query(query, [question, selectedOption, username], (err, results) => {
    if (err) {
      console.error('Error saving quiz responses:', err);
      return res.status(500).send('Error saving quiz responses');
    }
    res.send('Quiz responses saved successfully');
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

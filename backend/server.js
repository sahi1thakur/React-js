const express = require('express');
const bodyParser = require('body-parser');
const ldapAuth = require('./ldap');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors());

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  console.log(`Received login request for username: ${username}`);

  ldapAuth(username, password, (err, success) => {
    if (err || !success) {
      console.error('Authentication failed');
      return res.status(401).send('Authentication failed');
    }
    console.log('Authentication successful');
    return res.send('Authentication successful');
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

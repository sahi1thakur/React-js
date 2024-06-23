
const express = require('express');
const bodyParser = require('body-parser');
const ldap = require('ldapjs');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    const client = ldap.createClient({
        url: 'ldap://192.168.1.2:389' // Update with your AD server's IP
    });

    const dn = `CN=${username},OU=Users,DC=yourdomain,DC=com`; // Update with your DN structure

    client.bind(dn, password, (err) => {
        if (err) {
            res.status(401).send('Invalid credentials');
        } else {
            res.status(200).send('Login successful');
        }
        client.unbind();
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

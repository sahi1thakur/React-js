const ldap = require('ldapjs');

const client = ldap.createClient({
  url: 'ldap://192.168.1.2:389',
  reconnect: {
    initialDelay: 100, 
    maxDelay: 10000,
    failAfter: 10, 
  }
});

client.on('error', (err) => {
  console.error('LDAP connection error:', err);
});

const ldapAuth = (username, ou, password, callback) => {
  const dn = `CN=${username},OU=${ou},DC=sahil,DC=com`;

      client.bind(dn, password, (err) => {
        if (err) {
          return callback(err, false);
        }
        return callback(null, true);
      });
    };

module.exports = ldapAuth;
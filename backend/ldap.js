const ldap = require('ldapjs');

const client = ldap.createClient({
  url: 'ldap://192.168.1.2:389',
  reconnect: {
    initialDelay: 100, // milliseconds
    maxDelay: 10000, // milliseconds
    failAfter: 10, // attempt count
  }
});

client.on('error', (err) => {
  console.error('LDAP connection error:', err);
});

const searchUserDN = (username, callback) => {
  const opts = {
    filter: `(sAMAccountName=${username})`,
    scope: 'sub',
    attributes: ['dn']
  };

  let found = false;
  client.search('DC=sahil,DC=com', opts, (err, res) => {
    if (err) {
      return callback(err);
    }

    res.on('searchEntry', (entry) => {
      found = true;
      callback(null, entry.object.dn);
    });

    res.on('end', (result) => {
      if (!found) {
        callback(new Error('User not found'));
      }
    });
  });
};

const ldapAuth = (username, password, callback) => {
  searchUserDN(username, (err, userDN) => {
    if (err) {
      return callback(err, false);
    }

    client.bind(userDN, password, (err) => {
      if (err) {
        console.error('LDAP bind error:', err);
        return callback(err, false);
      }
      console.log('LDAP bind successful');
      return callback(null, true);
    });
  });
};

module.exports = ldapAuth;

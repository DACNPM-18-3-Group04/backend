const crypto = require('crypto');

function genRandomString(length) {
  return crypto.randomBytes(length).toString('hex').slice(0, length);
}

module.exports = genRandomString;

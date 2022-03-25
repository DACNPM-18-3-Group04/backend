const bcrypt = require('bcryptjs');

const hashPassword = (password) => {
  return bcrypt.hashSync(password, 10, null);
};

const matchPasswordHash = (password, passportHash) => {
  return bcrypt.compareSync(password, passportHash);
};

module.exports = {
  hashPassword,
  matchPasswordHash,
};

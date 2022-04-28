const NORMAL_ACCOUNT = 'C';
const ADMIN_ACCOUNT = 'A';
const DEFAULT_ACCOUNT = NORMAL_ACCOUNT;

const AccountTypes = [NORMAL_ACCOUNT, ADMIN_ACCOUNT];

const isValid = (accountType = '') => AccountTypes.includes(accountType);

module.exports = {
  DEFAULT: DEFAULT_ACCOUNT,
  NORMAL: NORMAL_ACCOUNT,
  ADMIN: ADMIN_ACCOUNT,
  isValid,
};

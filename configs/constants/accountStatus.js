const ACTIVE_ACCOUNT = 'A';
const DISABLED_ACCOUNT = 'D';
const INACTIVATED_ACCOUNT = 'I';
const DEFAULT_ACCOUNT = ACTIVE_ACCOUNT;

const AccountStatuses = [ACTIVE_ACCOUNT, DISABLED_ACCOUNT, INACTIVATED_ACCOUNT];

const isValid = (accountStatus = '') => AccountStatuses.includes(accountStatus);

module.exports = {
  DEFAULT: DEFAULT_ACCOUNT,
  DISABLED: DISABLED_ACCOUNT,
  ACTIVE: ACTIVE_ACCOUNT,
  INACTIVATED: INACTIVATED_ACCOUNT,
  isValid,
};

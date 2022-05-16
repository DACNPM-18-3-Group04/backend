const PENDING = 'P';
const SKIPPED = 'S';
const EXECUTED = 'E';
const DEFAULT = PENDING;

const STATUSES = Object.freeze([PENDING, SKIPPED, EXECUTED]);

module.exports = {
  PENDING,
  DEFAULT,
  SKIPPED,
  EXECUTED,
  STATUSES,
};

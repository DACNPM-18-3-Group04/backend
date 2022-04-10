const { Op } = require('sequelize');

const getQueryMinMaxFloat = (max, min) => {
  let maxClause;
  let minClause;
  if (max) {
    const qMax = Number.parseFloat(max);
    if (!Number.isNaN(qMax)) {
      maxClause = qMax;
    }
  }

  if (min) {
    const qMin = Number.parseFloat(min);
    if (!Number.isNaN(min)) {
      minClause = qMin;
    }
  }

  if (maxClause && minClause) {
    // Both are present
    return {
      [Op.lte]: maxClause,
      [Op.gte]: minClause,
    };
  }

  if (maxClause) {
    // Only max is present
    return {
      [Op.lte]: maxClause,
    };
  }

  if (minClause) {
    // Only max is present
    return {
      [Op.gte]: minClause,
    };
  }

  return null;
};

const getQueryMinMaxInt = (max, min) => {
  let maxClause;
  let minClause;
  console.log(max);
  console.log(min);
  if (max) {
    const qMax = Number.parseInt(max, 10);
    if (!Number.isNaN(qMax)) {
      maxClause = qMax;
    }
  }

  if (min) {
    const qMin = Number.parseInt(min, 10);
    if (!Number.isNaN(min)) {
      minClause = qMin;
    }
  }

  console.log(maxClause);
  console.log(minClause);

  if (maxClause && minClause) {
    // Both are present
    return {
      [Op.lte]: maxClause,
      [Op.gte]: minClause,
    };
  }

  if (maxClause) {
    // Only max is present
    return {
      [Op.lte]: maxClause,
    };
  }

  if (minClause) {
    // Only max is present
    return {
      [Op.gte]: minClause,
    };
  }

  return null;
};

module.exports = {
  getQueryMinMaxFloat,
  getQueryMinMaxInt,
};

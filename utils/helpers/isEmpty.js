const isEmpty = (value) => {
  return [null, undefined, '', []].includes(value);
};

module.exports = isEmpty;

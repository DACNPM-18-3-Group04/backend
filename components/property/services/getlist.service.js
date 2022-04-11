const propertyModel = require('../../property/property.model');
const handle = require('../../../utils/helpers/handlePromise')
const limit = require('../../../configs/constants/property/propertyPaginate');

const handleGetListProperty = async (params) => {
  let page = params || 1;
  const offset = (page - 1) * limit;

  const [total, property] = await Promise.all([
    propertyModel.count(),
    propertyModel.findAll({
      offset: offset,
      limit: limit
    })
  ]);

  let nPages = Math.floor(total / limit);
  if (total % limit > 0) nPages++;
  const page_numbers = [];
  for (i = 1; i <= nPages; i++) {
    page_numbers.push({
      value: i,
      isCurrentPage: i === +page
    })
  }
  if (page > nPages || page < 1) throw 'Not pound';

  if (page == nPages) return {
    property,
    empty: property.length === 0,
    page_numbers,
    prev_value: +page - 1,
    next_value: +page
  };

  if (page == 1) {
    return {
      property,
      empty: property.length === 0,
      page_numbers,
      prev_value: 1,
      next_value: +page + 1
    };
  } else {
    return {
      property,
      empty: property.length === 0,
      page_numbers,
      prev_value: +page - 1,
      next_value: +page + 1
    };
  };
};

module.exports = handleGetListProperty;
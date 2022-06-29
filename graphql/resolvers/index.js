const _ = require('lodash');
const districtResolver = require('./districtResolver');
const pronviceResolver = require('./provinceResolver');

const resolvers = _.merge({}, districtResolver, pronviceResolver);

module.exports = resolvers;

const { gql } = require('apollo-server');
const districtDefs = require('./districtDefs');
const provinceDefs = require('./provinceDefs');

const baseTypeDefs = gql`
  type Query

  type Mutation
`;

const schemaDefs = [baseTypeDefs, districtDefs, provinceDefs];

module.exports = schemaDefs;

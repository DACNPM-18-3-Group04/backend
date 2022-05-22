const { gql } = require('apollo-server');

const provinceDefs = gql`
  type Province {
    id: ID!
    name: String!
    districts: [District!]
  }

  type upsertProvinceOutput {
    data: Province
    message: String
    success: Boolean!
  }

  type removeProvinceOutput {
    success: Boolean!
    message: String
  }

  type allProvincesResponse {
    success: Boolean
    message: String
    data: [Province!]
  }

  type provinceResponse {
    success: Boolean
    message: String
    data: Province
  }

  extend type Query {
    getProvinceById(id: ID!): provinceResponse
    provinces: allProvincesResponse
  }

  extend type Mutation {
    upsertProvince(provinceName: String!, id: ID): upsertProvinceOutput!
    removeProvince(id: ID!): removeProvinceOutput!
  }
`;

module.exports = provinceDefs;

const { gql } = require('apollo-server');

const districtDefs = gql`
  type District {
    id: ID!
    name: String!
    province: Province!
    provinceId: ID!
  }

  type upsertDistrictOutput {
    data: District
    message: String
    success: Boolean!
  }

  type removeDistrictOutput {
    success: Boolean!
    message: String
  }

  type allDistrictsResponse {
    success: Boolean
    message: String
    data: [District!]
  }

  type districtResponse {
    success: Boolean
    message: String
    data: District
  }

  extend type Query {
    getDistrictById(id: ID!): districtResponse
    districts: allDistrictsResponse
  }

  extend type Mutation {
    upsertDistrict(
      districtName: String!
      provinceId: ID!
      id: ID
    ): upsertDistrictOutput!
    removeDistrict(id: ID!): removeDistrictOutput!
  }
`;

module.exports = districtDefs;

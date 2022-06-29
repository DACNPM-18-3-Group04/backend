const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const schemas = require('./schemas');
const resolvers = require('./resolvers');
const { provinceLoader, districtLoader } = require('./dataLoader/dataLoader');
const { getUser } = require('../components/auth/auth.middleware');

const graphqlServer = (httpServer) =>
  new ApolloServer({
    typeDefs: schemas,
    resolvers: resolvers,
    csrfPrevention: true,
    context: async ({ req, res }) => {
      const user = await getUser(req, res);
      if (!user) throw new Error('No user logged in');
      return {
        user: user,
        provinceLoader: provinceLoader,
        districtLoader: districtLoader,
      };
    },
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

module.exports = graphqlServer;

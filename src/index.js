const { GraphQLServer } = require("graphql-yoga");

const { prisma } = require("../prisma/generated/prisma-client");
const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const User = require("./resolvers/User");
const Link = require("./resolvers/Link");

const resolvers = {
  Query,
  Mutation,
  User,
  Link,
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: (request) => ({ ...request, prisma }),
});

server.start(() => console.log(`Server is running on http://localhost:4000`));

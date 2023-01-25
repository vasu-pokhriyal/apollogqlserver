import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDef } from "./src/schemagql.js";
import { resolvers } from "./src/resolvers.js";
import { makeExecutableSchema } from '@graphql-tools/schema';

const schema = makeExecutableSchema({
    typeDefs: typeDef,
    resolvers: resolvers,
});
const server = new ApolloServer({
    schema
});


const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});


console.log(`🚀  Server ready at: ${url}`);
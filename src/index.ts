import 'reflect-metadata';

import { ApolloServer } from 'apollo-server-express';
import Express from 'express';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import { RegisterResolver } from './schema/resolvers/UserResolvers';

const main = async () => {
   await createConnection();

   const schema = await buildSchema({
      resolvers: [RegisterResolver],
   });

   const apolloServer = new ApolloServer({ schema });
   const app = Express();

   apolloServer.applyMiddleware({ app });

   app.listen(3001, () => {
      console.log('server started on http://localhost:3001/graphql');
   });
};

main();

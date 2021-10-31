import 'reflect-metadata';

import { ApolloServer } from 'apollo-server-express';
import Express from 'express';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import session from 'express-session';
import connectRedis from 'connect-redis';
import { redis } from './redis';
import cors from 'cors';
import { HelloResolver } from './resolvers/Hello';
import { GetUserResolver } from './resolvers/user/Get';
import { MeResolver } from './resolvers/user/Me';
import { RegisterResolver } from './resolvers/user/Register';
import { LoginResolver } from './resolvers/user/Login';
import { WriteResolver } from './resolvers/note/Write';
import { GetNoteResolver } from './resolvers/note/Get';
import { UpdateNoteResolver } from './resolvers/note/Update';
import { DeleteNoteResolver } from './resolvers/note/Delete';
import { __prod__ } from './consts';

declare module 'express-session' {
   interface SessionData {
      userId: string;
   }
}

const main = async () => {
   if (__prod__) {
      await createConnection({
         type: 'postgres',
         url: process.env.DATABASE_URL,
         entities: ['dist/entity/*.*'],
         ssl: { rejectUnauthorized: false },
         synchronize: true,
      });
   } else {
      await createConnection();
   }

   const schema = await buildSchema({
      resolvers: [
         HelloResolver,
         GetUserResolver,
         MeResolver,
         RegisterResolver,
         LoginResolver,
         WriteResolver,
         GetNoteResolver,
         UpdateNoteResolver,
         DeleteNoteResolver,
      ],
      authChecker: ({ context: { req } }) => {
         if (req.session.userId) {
            return true;
         }
         return false;
      },
   });

   const apolloServer = new ApolloServer({
      schema,
      context: ({ req }: any) => ({ req }),
      playground: true,
      introspection: true,
   });
   const app = Express();

   const RedisStore = connectRedis(session);

   app.use(
      cors({
         credentials: true,
         origin: 'http://localhost:3000',
      })
   );

   app.use(
      session({
         store: new RedisStore({
            client: redis as any,
         }),
         name: 'qid',
         secret: 'Aasdhagsdadjasjdasd',
         resave: false,
         saveUninitialized: false,
         // cookie: {
         //    httpOnly: true,
         //    secure: __prod__,
         //    maxAge: 1000 * 60 * 60 * 24 * 7 * 365,
         // },
      })
   );

   apolloServer.applyMiddleware({ app });

   app.listen(process.env.PORT || 3001, () => {
      console.log(`server started on http://localhost:3001/graphql`);
   });
};

main();

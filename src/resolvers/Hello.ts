import { isAuth } from '../isAuth';
import { Query, Resolver, UseMiddleware } from 'type-graphql';

@Resolver()
export class HelloResolver {
   @UseMiddleware(isAuth)
   @Query(() => String)
   async hello() {
      return 'Hello world';
   }
}

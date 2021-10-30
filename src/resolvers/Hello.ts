import { Authorized, Query, Resolver } from 'type-graphql';

@Resolver()
export class HelloResolver {
   @Authorized()
   @Query(() => String)
   async hello() {
      return 'Hello world';
   }
}

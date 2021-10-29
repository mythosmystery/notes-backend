import { User } from '../../entity/User';
import { Arg, Query, Resolver, ID } from 'type-graphql';

@Resolver()
export class GetResolver {
   @Query(() => [User])
   async getUsers() {
      return await User.find({});
   }

   @Query(() => User)
   async getUser(@Arg('id') id: string) {
      return await User.findOne({
         where: { id },
      });
   }
}

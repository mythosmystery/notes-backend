import { User } from '../../entity/User';
import { Arg, Query, Resolver } from 'type-graphql';

@Resolver()
export class GetUserResolver {
   @Query(() => [User])
   async getUsers(): Promise<User[]> {
      return await User.find({});
   }

   @Query(() => User)
   async getUser(@Arg('id') id: string): Promise<User | undefined> {
      return await User.findOne({
         where: { id },
      });
   }
}

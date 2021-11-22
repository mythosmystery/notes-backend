import { User } from '../../entity/User';
import { MyContext } from '../../types/MyContext';
import { Ctx, Query, Resolver, UseMiddleware } from 'type-graphql';
import { isAuth } from 'src/isAuth';

@Resolver()
export class MeResolver {
   @Query(() => User, { nullable: true })
   @UseMiddleware(isAuth)
   async me(@Ctx() { payload }: MyContext): Promise<User | undefined> {
      if (!payload?.userId) {
         throw new Error('Not logged in');
      }
      return User.findOne(payload.userId);
   }
}

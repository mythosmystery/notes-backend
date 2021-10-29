import { User } from '../../entity/User';
import { MyContext } from '../../types/MyContext';
import { Ctx, Query, Resolver } from 'type-graphql';

@Resolver()
export class MeResolver {
   @Query(() => User, { nullable: true })
   async me(@Ctx() ctx: MyContext): Promise<User | null | undefined> {
      if (!ctx.req.session.userId) {
         return null;
      }
      return User.findOne(ctx.req.session.userId);
   }
}

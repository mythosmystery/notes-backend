import { Resolver, Mutation, Arg, Ctx } from 'type-graphql';
import bcrypt from 'bcryptjs';
import { User } from '../../entity/User';
import { MyContext } from 'src/types/MyContext';

@Resolver()
export class RegisterResolver {
   @Mutation(() => User)
   async register(
      @Arg('firstName') firstName: string,
      @Arg('lastName') lastName: string,
      @Arg('email') email: string,
      @Arg('password') password: string,
      @Ctx() ctx: MyContext
   ): Promise<User> {
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = await User.create({
         firstName,
         lastName,
         email,
         password: hashedPassword,
      }).save();
      ctx.req.session.userId = user.id;
      return user;
   }
}

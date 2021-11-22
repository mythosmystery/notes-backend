import { Resolver, Mutation, Arg } from 'type-graphql';
import { hash } from 'bcryptjs';
import { User } from '../../entity/User';
import { sign } from 'jsonwebtoken';
import { __secret__ } from '../../consts';
import { Auth } from '../../types/AuthGQL';

@Resolver()
export class RegisterResolver {
   @Mutation(() => User)
   async register(
      @Arg('firstName') firstName: string,
      @Arg('lastName') lastName: string,
      @Arg('email') email: string,
      @Arg('password') password: string
   ): Promise<Auth> {
      const hashedPassword = await hash(password, 12);
      const user = await User.create({
         firstName,
         lastName,
         email,
         password: hashedPassword
      }).save();
      return { token: sign({ userId: user.id }, __secret__, { expiresIn: '15m' }), user };
   }
}

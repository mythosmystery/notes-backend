import { Auth, User } from '../../entity/User';
import { Arg, Mutation, Resolver } from 'type-graphql';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { __secret__ } from 'src/consts';

@Resolver()
export class LoginResolver {
   @Mutation(() => Auth, { nullable: true })
   async login(@Arg('email') email: string, @Arg('password') password: string): Promise<Auth | null> {
      const user = await User.findOne({ where: { email } });

      if (!user) {
         throw new Error('Could not find user');
      }

      const valid = await compare(password, user.password);

      if (!valid) {
         throw new Error('Invalid password');
      }

      return { token: sign({ userId: user.id }, __secret__, { expiresIn: '15m' }), user };
   }
}

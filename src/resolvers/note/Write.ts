import { Note } from '../../entity/Note';
import { User } from '../../entity/User';
import { MyContext } from 'src/types/MyContext';
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';

@Resolver()
export class WriteResolver {
   @Mutation(() => Note)
   async writeNote(@Arg('body') body: string, @Arg('title') title: string, @Ctx() ctx: MyContext): Promise<Note> {
      const user = await User.findOne({ id: ctx.req.session.userId });
      const note = await Note.create({
         body,
         title,
         user,
      }).save();
      return note;
   }
}

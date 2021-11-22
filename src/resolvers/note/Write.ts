import { Note } from '../../entity/Note';
import { User } from '../../entity/User';
import { MyContext } from 'src/types/MyContext';
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import { isAuth } from '../../isAuth';

@Resolver()
export class WriteResolver {
   @UseMiddleware(isAuth)
   @Mutation(() => Note)
   async writeNote(
      @Arg('body') body: string,
      @Arg('title') title: string,
      @Ctx() { payload }: MyContext
   ): Promise<Note> {
      const user = await User.findOne({ id: payload?.userId });
      const note = await Note.create({
         body,
         title,
         user
      }).save();
      return note;
   }
}

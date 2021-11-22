import { Note } from '../../entity/Note';
import { Arg, Field, Mutation, ObjectType, Resolver, UseMiddleware } from 'type-graphql';
import { isAuth } from '../../isAuth';

@ObjectType()
class DeleteMessage {
   @Field()
   message: string;
}

@Resolver()
export class DeleteNoteResolver {
   @UseMiddleware(isAuth)
   @Mutation(() => DeleteMessage)
   async deleteNote(@Arg('id') id: string): Promise<DeleteMessage> {
      try {
         await Note.delete({ id });
         return { message: 'deleted ok' };
      } catch (e) {
         return { message: e };
      }
   }
}

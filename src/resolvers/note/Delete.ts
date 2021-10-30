import { Note } from '../../entity/Note';
import { Arg, Authorized, Field, Mutation, ObjectType, Resolver } from 'type-graphql';

@ObjectType()
class DeleteMessage {
   @Field()
   message: string;
}

@Resolver()
export class DeleteNoteResolver {
   @Authorized()
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

import { Note } from 'src/entity/Note';
import { Arg, Query, Resolver } from 'type-graphql';

@Resolver()
export class GetNoteResolver {
   @Query(() => [Note])
   async getNotes(): Promise<Note[]> {
      return await Note.find({});
   }

   @Query(() => Note)
   async getNote(@Arg('id') id: string): Promise<Note | undefined> {
      return await Note.findOne({ where: { id } });
   }
}

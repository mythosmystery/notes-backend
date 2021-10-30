import { Note } from '../../entity/Note';
import { Arg, Query, Resolver } from 'type-graphql';

@Resolver()
export class GetNoteResolver {
   @Query(() => [Note])
   async getNotes(): Promise<Note[]> {
      return await Note.find({ relations: ['user'] });
   }

   @Query(() => Note)
   async getNote(@Arg('id') id: string): Promise<Note | undefined> {
      return await Note.findOne({ where: { id }, relations: ['user'] });
   }
}

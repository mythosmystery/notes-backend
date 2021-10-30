import { Note } from 'src/entity/Note';
import { Mutation, Resolver } from 'type-graphql';

@Resolver()
export class UpdateNoteResolver {
   @Mutation(() => Note)
   async updateNote() {}
}

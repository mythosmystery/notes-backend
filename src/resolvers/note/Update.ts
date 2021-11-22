import { Note } from '../../entity/Note';
import { Arg, Field, InputType, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import { isAuth } from '../../isAuth';

@InputType()
class UpdateNoteInput implements Partial<Note> {
   @Field({ nullable: true })
   title?: string;

   @Field({ nullable: true })
   body?: string;
}

@Resolver()
export class UpdateNoteResolver {
   @UseMiddleware(isAuth)
   @Mutation(() => Note)
   async updateNote(@Arg('id') id: string, @Arg('data') newNote: UpdateNoteInput): Promise<Note | undefined> {
      await Note.update({ id }, { ...newNote });
      return await Note.findOne({ where: { id }, relations: ['user'] });
   }
}

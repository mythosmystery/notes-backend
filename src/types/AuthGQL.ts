import { User } from '../entity/User';
import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class Auth {
   @Field()
   token: string;

   @Field()
   user: User;
}

import { Field, ID, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Note } from './Note';

@ObjectType()
export class Auth {
   @Field()
   token: string;

   @Field()
   user: User;
}

@ObjectType()
@Entity()
export class User extends BaseEntity {
   @Field(() => ID)
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @Field()
   @Column()
   firstName: string;

   @Field()
   @Column()
   lastName: string;

   @Field()
   @Column('text', { unique: true })
   email: string;

   @Column()
   password: string;

   @Field(() => [Note])
   @OneToMany(() => Note, note => note.user, { eager: true })
   notes: Note[];
}

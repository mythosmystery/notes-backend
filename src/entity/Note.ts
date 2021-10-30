import { Field, ID, ObjectType } from 'type-graphql';
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

@ObjectType()
@Entity()
export class Note extends BaseEntity {
   @Field(() => ID)
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @Field()
   @Column()
   body: string;

   @Field()
   @Column()
   title: string;

   @Field()
   @CreateDateColumn()
   date: number;

   @Field(() => User)
   @ManyToOne(() => User, user => user.notes)
   user: User;
}

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Field, HideField, ID, ObjectType } from '@nestjs/graphql';
import { hashPasswordTransform } from './transforms/password.transform';

@ObjectType()
@Entity()
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  email: string;

  @HideField()
  @Column({ transformer: hashPasswordTransform })
  password: string;
}

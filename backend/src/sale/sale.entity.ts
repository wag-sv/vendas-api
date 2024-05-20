import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Product } from '../product/product.entity';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Sale {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  description: string;

  @Field(() => [Product])
  @OneToMany(() => Product, (product) => product.sale)
  products: Product[];

  @Field()
  @Column()
  totalValue: number;

  @Field()
  @Column()
  date: Date;
}

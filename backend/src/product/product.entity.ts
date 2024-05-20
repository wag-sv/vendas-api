import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Sale } from 'src/sale/sale.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@ObjectType()
@Entity()
export class Product {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column()
  price: number;

  @Field(() => Sale)
  @ManyToOne(() => Sale, (sale) => sale.products)
  sale: Sale;
}

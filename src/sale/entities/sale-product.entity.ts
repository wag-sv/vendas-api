import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Sale } from './sale.entity';
import { Product } from 'src/product/entities/product.entity';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class SaleProduct {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => Product)
  @ManyToOne(() => Product)
  product: Product;

  @Field(() => Sale)
  @ManyToOne(() => Sale, (sale) => sale.saleProducts)
  sale: Sale;

  @Field()
  @Column()
  quantity: number;

  @Field()
  @Column()
  unitPrice: number;

  @Field()
  @Column()
  totalPrice: number;
}

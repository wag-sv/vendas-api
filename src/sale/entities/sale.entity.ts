import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { SaleProduct } from './sale-product.entity';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Customer } from 'src/customer/entities/customer.entity';

@ObjectType()
@Entity()
export class Sale {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  description: string;

  @Field(() => [SaleProduct])
  @OneToMany(() => SaleProduct, (saleProduct) => saleProduct.sale, {
    cascade: true,
  })
  saleProducts: SaleProduct[];

  @Field(() => Customer)
  @ManyToOne(() => Customer, (customer) => customer.sales)
  customer: Customer;

  @Field()
  @Column()
  totalValue: number;

  @Field()
  @Column()
  date: Date;
}

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  TableInheritance,
  ChildEntity,
  ManyToMany,
  JoinTable,
  Unique,
} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ProductType } from './product-type.enum';

@ObjectType()
@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
@Unique(['name'])
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

  @Field()
  @Column()
  stock: number;

  @Field(() => ProductType)
  @Column({ type: 'enum', enum: ProductType })
  type: ProductType;
}

@ObjectType()
@ChildEntity(ProductType.DIGITAL)
export class DigitalProduct extends Product {
  @Field()
  @Column()
  downloadLink: string;
}

@ObjectType()
@ChildEntity(ProductType.CONFIGURABLE)
export class ConfigurableProduct extends Product {
  @Field()
  @Column()
  color: string;

  @Field()
  @Column()
  size: string;
}

@ObjectType()
@ChildEntity(ProductType.GROUPED)
export class GroupedProduct extends Product {
  @Field(() => [Product])
  @ManyToMany(() => Product)
  @JoinTable()
  associatedProducts: Product[];
}

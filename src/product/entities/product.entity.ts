import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  Unique,
  ChildEntity,
  TableInheritance,
} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
@Entity()
@Unique(['name'])
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
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

  @Field()
  @Column()
  type: string;
}

@ObjectType()
@ChildEntity('DIGITAL')
export class DigitalProduct extends Product {
  @Field()
  @Column()
  downloadLink: string;
}

@ObjectType()
@ChildEntity('CONFIGURABLE')
export class ConfigurableProduct extends Product {
  @Field()
  @Column()
  color: string;

  @Field()
  @Column()
  size: string;
}

@ObjectType()
@ChildEntity('GROUPED')
export class GroupedProduct extends Product {
  @Field(() => [Product])
  @ManyToMany(() => Product)
  @JoinTable()
  associatedProducts: Product[];
}

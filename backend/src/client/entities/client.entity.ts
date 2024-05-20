import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Sale } from 'src/sale/entities/sale.entity';

@ObjectType()
@Entity()
export class Client {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column({ unique: true })
  cpf: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field(() => [Sale])
  @OneToMany(() => Sale, (sale) => sale.client)
  sales: Sale[];
}

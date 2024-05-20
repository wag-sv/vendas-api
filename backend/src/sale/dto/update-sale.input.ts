import { Field, InputType } from '@nestjs/graphql';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Product } from 'src/product/product.entity';

@InputType()
export class UpdateSaleInput {
  @Field({ nullable: true })
  @IsNotEmpty({ message: 'Descrição é obrigatória.' })
  @IsString()
  description?: string;

  @Field(() => [Product], { nullable: true })
  @IsNotEmpty({ message: 'Produtos são obrigatórios.' })
  products?: Product[];

  @Field({ nullable: true })
  @IsNotEmpty({ message: 'Valor total é obrigatório.' })
  @IsNumber()
  totalValue?: number;

  @Field(() => Date, { nullable: true })
  @IsNotEmpty({ message: 'Data é obrigatória.' })
  @IsDate({ message: 'Data inválida.' })
  date?: Date;
}

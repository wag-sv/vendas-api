import { InputType, Field } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsDate,
  IsUUID,
  IsArray,
  ArrayMinSize,
} from 'class-validator';
import { CreateSaleProductInput } from './create-sale-product.input';

@InputType()
export class CreateSaleInput {
  @Field()
  @IsNotEmpty({ message: 'Descrição é obrigatória.' })
  @IsString()
  description: string;

  @Field(() => [CreateSaleProductInput])
  @IsNotEmpty({ message: 'Produtos são obrigatórios.' })
  @IsArray()
  @ArrayMinSize(1, { message: 'A venda deve ter pelo menos um produto.' })
  saleProducts: CreateSaleProductInput[];

  @Field()
  @IsNotEmpty({ message: 'Valor total é obrigatório.' })
  @IsNumber()
  totalValue: number;

  @Field(() => Date)
  @IsNotEmpty({ message: 'Data é obrigatória.' })
  @IsDate({ message: 'Data inválida.' })
  date: Date;

  @Field()
  @IsNotEmpty({ message: 'ID do cliente é obrigatório.' })
  @IsUUID()
  clientId: string;
}

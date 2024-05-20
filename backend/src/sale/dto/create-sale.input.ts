import { Field, InputType } from '@nestjs/graphql';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Product } from 'src/product/product.entity';

@InputType()
export class CreateSaleInput {
  @Field()
  @IsNotEmpty({ message: 'Descrição é obrigatória.' })
  @IsString()
  description: string;

  @Field(() => [Product])
  @IsNotEmpty({ message: 'Produtos são obrigatórios.' })
  products: Product[];

  @Field()
  @IsNotEmpty({ message: 'Valor total é obrigatório.' })
  @IsNumber()
  totalValue: number;

  @Field(() => Date)
  @IsNotEmpty({ message: 'Data é obrigatória.' })
  @IsDate({ message: 'Data inválida.' })
  date: Date;
}

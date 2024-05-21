import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateProductInput {
  @Field()
  @IsNotEmpty({ message: 'Nome é obrigatório.' })
  @IsString()
  name: string;

  @Field()
  @IsNotEmpty({ message: 'Descrição é obrigatória.' })
  @IsString()
  description: string;

  @Field()
  @IsNotEmpty({ message: 'Preço é obrigatório.' })
  @IsNumber()
  price: number;

  @Field()
  @IsNotEmpty({ message: 'Estoque é obrigatório.' })
  @IsNumber()
  stock: number;
}

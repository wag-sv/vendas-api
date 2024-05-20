import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateProductInput } from './create-product.input';

@InputType()
export class CreateConfigurableProductInput extends CreateProductInput {
  @Field()
  @IsNotEmpty({ message: 'Cor é obrigatória.' })
  @IsString()
  color: string;

  @Field()
  @IsNotEmpty({ message: 'Tamanho é obrigatório.' })
  @IsString()
  size: string;
}

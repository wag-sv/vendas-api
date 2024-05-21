import { InputType, Field } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsArray,
  ArrayMinSize,
  IsUUID,
  IsNumber,
} from 'class-validator';
import { CreateProductInput } from './create-product.input';

@InputType()
export class CreateGroupedProductInput extends CreateProductInput {
  @Field(() => [String])
  @IsNotEmpty({ message: 'Produtos associados são obrigatórios.' })
  @IsArray()
  @ArrayMinSize(2, {
    message: 'O produto agrupado deve ter pelo menos dois produtos associados.',
  })
  @IsUUID('4', {
    each: true,
    message: 'Cada produto associado deve ser um UUID válido.',
  })
  associatedProducts: string[];

  @Field()
  @IsNotEmpty({ message: 'Preço é obrigatório.' })
  @IsNumber()
  price: number;
}

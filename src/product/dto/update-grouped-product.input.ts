import { InputType, Field } from '@nestjs/graphql';
import {
  IsArray,
  IsOptional,
  ArrayMinSize,
  IsUUID,
  IsNumber,
} from 'class-validator';
import { UpdateProductInput } from './update-product.input';

@InputType()
export class UpdateGroupedProductInput extends UpdateProductInput {
  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  @ArrayMinSize(2, {
    message: 'O produto agrupado deve ter pelo menos dois produtos associados.',
  })
  @IsUUID('4', {
    each: true,
    message: 'Cada produto associado deve ser um UUID válido.',
  })
  associatedProducts?: string[];

  @Field({ nullable: true })
  @IsOptional()
  @IsNumber()
  price?: number;
}

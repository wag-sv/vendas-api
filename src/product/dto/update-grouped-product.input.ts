import { InputType, Field } from '@nestjs/graphql';
import { IsArray, IsOptional, ArrayMinSize, IsNumber } from 'class-validator';
import { UpdateProductInput } from './update-product.input';

@InputType()
export class UpdateGroupedProductInput extends UpdateProductInput {
  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  @ArrayMinSize(2, {
    message: 'O produto agrupado deve ter pelo menos dois produtos associados.',
  })
  associatedProducts?: string[];

  @Field({ nullable: true })
  @IsOptional()
  @IsNumber()
  price?: number;
}

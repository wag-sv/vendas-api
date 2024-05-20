import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsOptional } from 'class-validator';
import { UpdateProductInput } from './update-product.input';

@InputType()
export class UpdateConfigurableProductInput extends UpdateProductInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  color?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  size?: string;
}

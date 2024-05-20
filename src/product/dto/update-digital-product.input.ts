import { InputType, Field } from '@nestjs/graphql';
import { IsOptional, IsUrl } from 'class-validator';
import { UpdateProductInput } from './update-product.input';

@InputType()
export class UpdateDigitalProductInput extends UpdateProductInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsUrl({}, { message: 'Link para download deve ser uma URL válida.' })
  downloadLink?: string;
}

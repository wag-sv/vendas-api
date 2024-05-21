import { InputType, Field } from '@nestjs/graphql';
import {
  IsOptional,
  IsString,
  IsDate,
  IsUUID,
  ArrayMinSize,
  IsArray,
} from 'class-validator';
import { UpdateSaleProductInput } from './update-sale-product.input';

@InputType()
export class UpdateSaleInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Field(() => [UpdateSaleProductInput], { nullable: true })
  @IsOptional()
  @IsArray()
  @ArrayMinSize(1, { message: 'A venda deve ter pelo menos um produto.' })
  saleProducts?: UpdateSaleProductInput[];

  @Field(() => Date, { nullable: true })
  @IsOptional()
  @IsDate({ message: 'Data inválida.' })
  date?: Date;

  @Field({ nullable: true })
  @IsOptional()
  @IsUUID()
  customerId?: string;
}

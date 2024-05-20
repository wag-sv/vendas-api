import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID, IsNumber } from 'class-validator';

@InputType()
export class UpdateSaleProductInput {
  @Field()
  @IsNotEmpty({ message: 'ID do produto é obrigatório.' })
  @IsUUID()
  productId: string;

  @Field()
  @IsNotEmpty({ message: 'Quantidade é obrigatória.' })
  @IsNumber()
  quantity: number;
}

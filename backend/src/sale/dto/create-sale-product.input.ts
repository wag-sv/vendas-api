import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

@InputType()
export class CreateSaleProductInput {
  @Field()
  @IsNotEmpty({ message: 'ID do produto é obrigatório.' })
  @IsUUID()
  productId: string;

  @Field()
  @IsNotEmpty({ message: 'Quantidade é obrigatória.' })
  @IsNumber()
  quantity: number;
}

import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsUrl } from 'class-validator';
import { CreateProductInput } from './create-product.input';

@InputType()
export class CreateDigitalProductInput extends CreateProductInput {
  @Field()
  @IsNotEmpty({ message: 'Link para download é obrigatório.' })
  @IsUrl({}, { message: 'Link para download deve ser uma URL válida.' })
  downloadLink: string;
}

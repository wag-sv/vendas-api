import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateProductInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsNotEmpty({ message: 'Nome é obrigatório.' })
  @IsString()
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsNotEmpty({ message: 'Descrição é obrigatória.' })
  @IsString()
  description?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsNotEmpty({ message: 'Preço é obrigatório.' })
  @IsNumber()
  price?: number;
}

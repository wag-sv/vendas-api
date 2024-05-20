import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateClientInput {
  @Field()
  @IsNotEmpty({ message: 'Nome é obrigatório.' })
  @IsString()
  name: string;

  @Field()
  @IsNotEmpty({ message: 'CPF é obrigatório.' })
  @IsString()
  cpf: string;

  @Field()
  @IsNotEmpty({ message: 'Email é obrigatório.' })
  @IsEmail({}, { message: 'Email deve ser válido.' })
  email: string;
}

import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsNotEmpty({ message: 'Nome é obrigatório.' })
  @IsString()
  name: string;

  @Field()
  @IsNotEmpty({ message: 'Email é obrigatório.' })
  @IsEmail({}, { message: 'Email inválido.' })
  email: string;

  @Field()
  @IsNotEmpty({ message: 'Senha é obrigatório.' })
  @IsString()
  password: string;
}

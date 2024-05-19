import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';

@InputType()
export class AuthInput {
  @Field()
  @IsEmail({}, { message: 'O e-mail deve ser um endereço de e-mail válido.' })
  email: string;

  @Field()
  @IsNotEmpty({ message: 'A senha não pode estar vazia.' })
  password: string;
}

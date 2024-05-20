import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsNotEmpty({ message: 'Nome é obrigatório.' })
  @IsString()
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsNotEmpty({ message: 'Email é obrigatório.' })
  @IsEmail({}, { message: 'Email inválido.' })
  email?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsNotEmpty({ message: 'Senha é obrigatório.' })
  @IsString()
  password?: string;
}

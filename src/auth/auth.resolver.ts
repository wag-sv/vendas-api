import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthType } from './dto/auth.type';
import { AuthInput } from './dto/auth.input';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthType)
  async login(@Args('loginInput') loginInput: AuthInput): Promise<AuthType> {
    const response = await this.authService.validateUser(loginInput);
    return { user: response.user, token: response.token };
  }
}

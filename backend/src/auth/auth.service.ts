import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthInput } from './dto/auth.input';
import { compareSync } from 'bcrypt';
import { AuthType } from './dto/auth.type';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  private generateToken(user: User): Promise<string> {
    const payload = { username: user.email, sub: user.id };
    return this.jwtService.signAsync(payload);
  }

  async validateUser(data: AuthInput): Promise<AuthType> {
    const user = await this.userService.findOneByEmail(data.email);
    if (!user) throw new Error('Usuário não encontrado.');
    const isPasswordValid = compareSync(data.password, user.password);
    if (!isPasswordValid) throw new Error('Senha incorreta.');
    const token = await this.generateToken(user);
    return { user, token };
  }
}

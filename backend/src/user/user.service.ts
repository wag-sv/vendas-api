import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    try {
      const user = this.userRepository.create(createUserInput);
      const savedUser = await this.userRepository.save(user);
      return savedUser;
    } catch (error) {
      throw new InternalServerErrorException('Falha ao criar o usuário.');
    }
  }

  async update(id: string, updateUserInput: UpdateUserInput): Promise<User> {
    try {
      await this.userRepository.update(id, updateUserInput);
      const user = await this.userRepository.findOne({ where: { id } });
      return user;
    } catch (error) {
      throw new InternalServerErrorException('Falha ao atualizar o usuário.');
    }
  }

  async remove(id: string): Promise<boolean> {
    try {
      await this.userRepository.delete(id);
      return true;
    } catch (error) {
      throw new InternalServerErrorException('Falha ao deletar o usuário.');
    }
  }

  async findAll(): Promise<User[]> {
    try {
      const users = await this.userRepository.find();
      return users;
    } catch (error) {
      throw new InternalServerErrorException('Falha ao buscar os usuários.');
    }
  }

  async findOneById(id: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      return user;
    } catch (error) {
      throw new InternalServerErrorException('Falha ao buscar o usuário.');
    }
  }

  async findOneByEmail(email: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ where: { email } });
      return user;
    } catch (error) {
      throw new InternalServerErrorException('Falha ao buscar o usuário.');
    }
  }
}

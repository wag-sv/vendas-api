import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './entities/client.entity';
import { CreateClientInput } from './dto/create-client.input';
import { UpdateClientInput } from './dto/update-client.input';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
  ) {}

  async create(createClientInput: CreateClientInput): Promise<Client> {
    const client = this.clientRepository.create(createClientInput);
    try {
      return await this.clientRepository.save(client);
    } catch (error) {
      throw new InternalServerErrorException('Falha ao criar o cliente.');
    }
  }

  async update(
    id: string,
    updateClientInput: UpdateClientInput,
  ): Promise<Client> {
    const client = await this.clientRepository.findOne({ where: { id } });
    if (!client) {
      throw new NotFoundException('Cliente não encontrado.');
    }
    Object.assign(client, updateClientInput);
    try {
      return await this.clientRepository.save(client);
    } catch (error) {
      throw new InternalServerErrorException('Falha ao atualizar o cliente.');
    }
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.clientRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Cliente não encontrado.');
    }
    return true;
  }

  async findOneById(id: string): Promise<Client> {
    const client = await this.clientRepository.findOne({ where: { id } });
    if (!client) {
      throw new NotFoundException('Cliente não encontrado.');
    }
    return client;
  }

  async findOneByCpf(cpf: string): Promise<Client> {
    const client = await this.clientRepository.findOne({ where: { cpf } });
    if (!client) {
      throw new NotFoundException('Cliente não encontrado.');
    }
    return client;
  }

  async findAll(): Promise<Client[]> {
    return this.clientRepository.find();
  }
}

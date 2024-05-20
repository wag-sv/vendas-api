import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';
import { CreateCustomerInput } from './dto/create-customer.input';
import { UpdateCustomerInput } from './dto/update-customer.input';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  async create(createCustomerInput: CreateCustomerInput): Promise<Customer> {
    const customer = this.customerRepository.create(createCustomerInput);
    try {
      return await this.customerRepository.save(customer);
    } catch (error) {
      throw new InternalServerErrorException('Falha ao criar o cliente.');
    }
  }

  async update(
    id: string,
    updateCustomerInput: UpdateCustomerInput,
  ): Promise<Customer> {
    const customer = await this.customerRepository.findOne({ where: { id } });
    if (!customer) {
      throw new NotFoundException('Cliente não encontrado.');
    }
    Object.assign(customer, updateCustomerInput);
    try {
      return await this.customerRepository.save(customer);
    } catch (error) {
      throw new InternalServerErrorException('Falha ao atualizar o cliente.');
    }
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.customerRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Cliente não encontrado.');
    }
    return true;
  }

  async findOneById(id: string): Promise<Customer> {
    const customer = await this.customerRepository.findOne({ where: { id } });
    if (!customer) {
      throw new NotFoundException('Cliente não encontrado.');
    }
    return customer;
  }

  async findOneByCpf(cpf: string): Promise<Customer> {
    const customer = await this.customerRepository.findOne({ where: { cpf } });
    if (!customer) {
      throw new NotFoundException('Cliente não encontrado.');
    }
    return customer;
  }

  async findAll(): Promise<Customer[]> {
    return this.customerRepository.find();
  }
}

import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CustomerService } from './customer.service';
import { CreateCustomerInput } from './dto/create-customer.input';
import { UpdateCustomerInput } from './dto/update-customer.input';
import { Customer } from './entities/customer.entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/auth.guard';

@UseGuards(GqlAuthGuard)
@Resolver(() => Customer)
export class CustomerResolver {
  constructor(private readonly customerService: CustomerService) {}

  @Mutation(() => Customer)
  async createCustomer(
    @Args('createCustomertInput') createCustomerInput: CreateCustomerInput,
  ): Promise<Customer> {
    return this.customerService.create(createCustomerInput);
  }

  @Mutation(() => Customer)
  async updateCustomer(
    @Args('id') id: string,
    @Args('updateCustomertInput') updateCustomerInput: UpdateCustomerInput,
  ): Promise<Customer> {
    return this.customerService.update(id, updateCustomerInput);
  }

  @Mutation(() => Boolean)
  async removeCustomer(@Args('id') id: string): Promise<boolean> {
    return this.customerService.remove(id);
  }

  @Query(() => Customer)
  async findOne(@Args('id') id: string): Promise<Customer> {
    return this.customerService.findOneById(id);
  }

  @Query(() => Customer)
  async findOneByCpf(@Args('cpf') cpf: string): Promise<Customer> {
    return this.customerService.findOneByCpf(cpf);
  }

  @Query(() => [Customer])
  async getCustomers(): Promise<Customer[]> {
    return this.customerService.findAll();
  }
}

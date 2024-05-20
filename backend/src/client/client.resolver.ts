import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ClientService } from './client.service';
import { CreateClientInput } from './dto/create-client.input';
import { UpdateClientInput } from './dto/update-client.input';
import { Client } from './entities/client.entity';

@Resolver(() => Client)
export class ClientResolver {
  constructor(private readonly clientService: ClientService) {}

  @Mutation(() => Client)
  async createClient(
    @Args('createClientInput') createClientInput: CreateClientInput,
  ): Promise<Client> {
    return this.clientService.create(createClientInput);
  }

  @Mutation(() => Client)
  async updateClient(
    @Args('id') id: string,
    @Args('updateClientInput') updateClientInput: UpdateClientInput,
  ): Promise<Client> {
    return this.clientService.update(id, updateClientInput);
  }

  @Mutation(() => Boolean)
  async removeClient(@Args('id') id: string): Promise<boolean> {
    return this.clientService.remove(id);
  }

  @Query(() => Client, { name: 'client' })
  async findOne(@Args('id') id: string): Promise<Client> {
    return this.clientService.findOneById(id);
  }

  @Query(() => Client, { name: 'clientByCpf' })
  async findOneByCpf(@Args('cpf') cpf: string): Promise<Client> {
    return this.clientService.findOneByCpf(cpf);
  }

  @Query(() => [Client], { name: 'clients' })
  async findAll(): Promise<Client[]> {
    return this.clientService.findAll();
  }
}

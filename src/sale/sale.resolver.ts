import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { SaleService } from './sale.service';
import { Sale } from './entities/sale.entity';
import { CreateSaleInput } from './dto/create-sale.input';
import { UpdateSaleInput } from './dto/update-sale.input';

@Resolver(() => Sale)
export class SaleResolver {
  constructor(private saleService: SaleService) {}

  @Mutation(() => Sale)
  async createSale(
    @Args('createSaleInput') createSaleInput: CreateSaleInput,
  ): Promise<Sale> {
    return this.saleService.create(createSaleInput);
  }

  @Mutation(() => Sale)
  async updateSale(
    @Args('id') id: string,
    @Args('updateSaleInput') updateSaleInput: UpdateSaleInput,
  ): Promise<Sale> {
    return this.saleService.update(id, updateSaleInput);
  }

  @Mutation(() => Boolean)
  async removeSale(@Args('id') id: string): Promise<boolean> {
    return this.saleService.remove(id);
  }

  @Query(() => [Sale], { name: 'sales' })
  async findAll(): Promise<Sale[]> {
    return this.saleService.findAll();
  }

  @Query(() => Sale, { name: 'sale' })
  async findOne(@Args('id') id: string): Promise<Sale> {
    return this.saleService.findOneById(id);
  }
}

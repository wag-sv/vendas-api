import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { SaleService } from './sale.service';
import { Sale } from './sale.entity';
import { CreateSaleInput } from './dto/create-sale.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Resolver(() => Sale)
export class SaleResolver {
  constructor(private saleService: SaleService) {}

  @UseGuards(AuthGuard('jwt'))
  @Query(() => [Sale])
  async sales() {
    return this.saleService.findAll();
  }

  @Mutation(() => Sale)
  async createSale(@Args('saleInput') saleInput: CreateSaleInput) {
    return this.saleService.create(saleInput);
  }
}

import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private productService: ProductService) {}

  @Query(() => [Product])
  async products() {
    return this.productService.findAll();
  }

  @Mutation(() => Product)
  async createProduct(
    @Args('createProductInput') productInput: CreateProductInput,
  ) {
    return this.productService.create(productInput);
  }

  @Mutation(() => Product)
  async updateProduct(
    @Args('id') id: string,
    @Args('updateProductInput') productInput: UpdateProductInput,
  ) {
    return this.productService.update(id, productInput);
  }
}

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  ConfigurableProduct,
  DigitalProduct,
  GroupedProduct,
  Product,
} from './entities/product.entity';
import { ProductService } from './product.service';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/auth.guard';
import { CreateDigitalProductInput } from './dto/create-digital-product.input';
import { CreateConfigurableProductInput } from './dto/create-configurable-product.input';
import { CreateGroupedProductInput } from './dto/create-grouped-product.input';
import { UpdateDigitalProductInput } from './dto/update-digital-product.input';
import { UpdateConfigurableProductInput } from './dto/update-configurable-product.input';
import { UpdateGroupedProductInput } from './dto/update-grouped-product.input';

@UseGuards(GqlAuthGuard)
@Resolver(() => Product)
export class ProductResolver {
  constructor(private productService: ProductService) {}

  @Mutation(() => Product)
  async createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ): Promise<Product> {
    const product = await this.productService.create(createProductInput);
    return product;
  }

  @Mutation(() => DigitalProduct)
  async createDigitalProduct(
    @Args('createDigitalProductInput')
    createDigitalProductInput: CreateDigitalProductInput,
  ): Promise<DigitalProduct> {
    return this.productService.createDigitalProduct(createDigitalProductInput);
  }

  @Mutation(() => ConfigurableProduct)
  async createConfigurableProduct(
    @Args('createConfigurableProductInput')
    createConfigurableProductInput: CreateConfigurableProductInput,
  ): Promise<ConfigurableProduct> {
    return this.productService.createConfigurableProduct(
      createConfigurableProductInput,
    );
  }

  @Mutation(() => GroupedProduct)
  async createGroupedProduct(
    @Args('createGroupedProductInput')
    createGroupedProductInput: CreateGroupedProductInput,
  ): Promise<GroupedProduct> {
    return this.productService.createGroupedProduct(createGroupedProductInput);
  }

  @Mutation(() => Product)
  async updateProduct(
    @Args('id') id: string,
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ): Promise<Product> {
    const product = await this.productService.update(id, updateProductInput);
    return product;
  }

  @Mutation(() => DigitalProduct)
  async updateDigitalProduct(
    @Args('id') id: string,
    @Args('updateDigitalProductInput')
    updateDigitalProductInput: UpdateDigitalProductInput,
  ): Promise<DigitalProduct> {
    return this.productService.updateDigitalProduct(
      id,
      updateDigitalProductInput,
    );
  }

  @Mutation(() => ConfigurableProduct)
  async updateConfigurableProduct(
    @Args('id') id: string,
    @Args('updateConfigurableProductInput')
    updateConfigurableProductInput: UpdateConfigurableProductInput,
  ): Promise<ConfigurableProduct> {
    return this.productService.updateConfigurableProduct(
      id,
      updateConfigurableProductInput,
    );
  }

  @Mutation(() => GroupedProduct)
  async updateGroupedProduct(
    @Args('id') id: string,
    @Args('updateGroupedProductInput')
    updateGroupedProductInput: UpdateGroupedProductInput,
  ): Promise<GroupedProduct> {
    return this.productService.updateGroupedProduct(
      id,
      updateGroupedProductInput,
    );
  }

  @Mutation(() => Boolean)
  async removeProduct(@Args('id') id: string): Promise<boolean> {
    await this.productService.remove(id);
    return true;
  }

  @Query(() => [Product])
  async getProducts(): Promise<Product[]> {
    const products = await this.productService.findAll();
    return products;
  }

  @Query(() => Product, { nullable: true })
  async getProductById(@Args('id') id: string): Promise<Product> {
    const product = await this.productService.findOneById(id);
    return product;
  }
}

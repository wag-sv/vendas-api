import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';
import {
  Product,
  DigitalProduct,
  ConfigurableProduct,
  GroupedProduct,
} from './entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      DigitalProduct,
      ConfigurableProduct,
      GroupedProduct,
    ]),
  ],
  providers: [ProductService, ProductResolver],
  exports: [ProductService],
})
export class ProductModule {}

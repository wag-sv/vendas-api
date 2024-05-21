import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaleService } from './sale.service';
import { SaleResolver } from './sale.resolver';
import { Sale } from './entities/sale.entity';
import { SaleProduct } from './entities/sale-product.entity';
import { ProductModule } from '../product/product.module';
import { CustomerModule } from 'src/customer/customer.module';
import { Customer } from 'src/customer/entities/customer.entity';
import {
  ConfigurableProduct,
  DigitalProduct,
  GroupedProduct,
  Product,
} from 'src/product/entities/product.entity';
import { ProductService } from 'src/product/product.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Sale,
      SaleProduct,
      Customer,
      Product,
      DigitalProduct,
      ConfigurableProduct,
      GroupedProduct,
    ]),
    ProductModule,
    CustomerModule,
  ],
  providers: [SaleService, SaleResolver, ProductService],
})
export class SaleModule {}

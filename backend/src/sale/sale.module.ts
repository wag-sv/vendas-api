import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaleService } from './sale.service';
import { SaleResolver } from './sale.resolver';
import { Sale } from './entities/sale.entity';
import { SaleProduct } from './entities/sale-product.entity';
import { ProductModule } from '../product/product.module';
import { ClientModule } from 'src/client/client.module';
import { Client } from 'src/client/entities/client.entity';
import { Product } from 'src/product/entities/product.entity';
import { ProductService } from 'src/product/product.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Sale, SaleProduct, Client, Product]),
    ProductModule,
    ClientModule,
  ],
  providers: [SaleService, SaleResolver, ProductService],
})
export class SaleModule {}

import { Module } from '@nestjs/common';
import { SaleService } from './sale.service';
import { SaleResolver } from './sale.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sale } from './sale.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sale])],
  providers: [SaleService, SaleResolver],
})
export class SaleModule {}

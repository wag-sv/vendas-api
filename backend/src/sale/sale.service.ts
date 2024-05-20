import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sale } from './sale.entity';
import { Repository } from 'typeorm';
import { CreateSaleInput } from './dto/create-sale.input';
import { UpdateSaleInput } from './dto/update-sale.input';

@Injectable()
export class SaleService {
  constructor(
    @InjectRepository(Sale)
    private saleRepository: Repository<Sale>,
  ) {}

  async create(createSaleInput: CreateSaleInput): Promise<Sale> {
    try {
      const sale = this.saleRepository.create(createSaleInput);
      const savedSale = await this.saleRepository.save(sale);
      return savedSale;
    } catch (error) {
      throw new InternalServerErrorException('Falha ao criar a venda.');
    }
  }

  async update(id: string, updateSaleInput: UpdateSaleInput): Promise<Sale> {
    try {
      await this.saleRepository.update(id, updateSaleInput);
      const sale = await this.saleRepository.findOne({ where: { id } });
      return sale;
    } catch (error) {
      throw new InternalServerErrorException('Falha ao atualizar a venda.');
    }
  }

  async remove(id: string): Promise<boolean> {
    try {
      await this.saleRepository.delete(id);
      return true;
    } catch (error) {
      throw new InternalServerErrorException('Falha ao deletar a venda.');
    }
  }

  async findAll(): Promise<Sale[]> {
    try {
      const sales = await this.saleRepository.find();
      return sales;
    } catch (error) {
      throw new InternalServerErrorException('Falha ao buscar as vendas.');
    }
  }

  async findOneById(id: string): Promise<Sale> {
    try {
      const sale = await this.saleRepository.findOne({ where: { id } });
      return sale;
    } catch (error) {
      throw new InternalServerErrorException('Falha ao buscar a venda.');
    }
  }
}

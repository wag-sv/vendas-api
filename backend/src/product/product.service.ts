import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(createProductInput: CreateProductInput): Promise<Product> {
    try {
      const product = this.productRepository.create(createProductInput);
      const savedProduct = await this.productRepository.save(product);
      return savedProduct;
    } catch (error) {
      throw new InternalServerErrorException('Falha ao criar o produto.');
    }
  }

  async update(
    id: string,
    updateProductInput: UpdateProductInput,
  ): Promise<Product> {
    try {
      await this.productRepository.update(id, updateProductInput);
      const product = await this.productRepository.findOne({ where: { id } });
      return product;
    } catch (error) {
      throw new InternalServerErrorException('Falha ao atualizar o produto.');
    }
  }

  async remove(id: string): Promise<boolean> {
    try {
      await this.productRepository.delete(id);
      return true;
    } catch (error) {
      throw new InternalServerErrorException('Falha ao deletar o produto.');
    }
  }

  async findAll(): Promise<Product[]> {
    try {
      const products = await this.productRepository.find();
      return products;
    } catch (error) {
      throw new InternalServerErrorException('Falha ao buscar os produtos.');
    }
  }

  async findOneById(id: string): Promise<Product> {
    try {
      const product = await this.productRepository.findOne({ where: { id } });
      return product;
    } catch (error) {
      throw new InternalServerErrorException('Falha ao buscar o produto.');
    }
  }
}

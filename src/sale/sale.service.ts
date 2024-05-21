import {
  Injectable,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sale } from './entities/sale.entity';
import { SaleProduct } from './entities/sale-product.entity';
import { Customer } from '../customer/entities/customer.entity';
import { CreateSaleInput } from './dto/create-sale.input';
import { UpdateSaleInput } from './dto/update-sale.input';
import { ProductService } from '../product/product.service';
import { cpf } from 'cpf-cnpj-validator';
import { Product } from 'src/product/entities/product.entity';

@Injectable()
export class SaleService {
  constructor(
    @InjectRepository(Sale)
    private saleRepository: Repository<Sale>,
    @InjectRepository(SaleProduct)
    private saleProductRepository: Repository<SaleProduct>,
    @InjectRepository(Customer)
    private clientRepository: Repository<Customer>,
    private readonly productService: ProductService,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(createSaleInput: CreateSaleInput): Promise<Sale> {
    const { saleProducts, customerId, ...saleData } = createSaleInput;

    try {
      if (saleProducts.length < 1) {
        throw new BadRequestException(
          'A venda deve ter pelo menos um produto.',
        );
      }

      const customer = await this.clientRepository.findOne({
        where: { id: customerId },
      });

      if (!customer) {
        throw new InternalServerErrorException('Cliente não encontrado.');
      }

      if (!cpf.isValid(customer.cpf)) {
        throw new BadRequestException('CPF do cliente é inválido.');
      }

      let totalValue = 0;

      const sale = this.saleRepository.create({ ...saleData, customer });

      sale.saleProducts = await Promise.all(
        saleProducts.map(async (saleProductInput) => {
          const product = await this.productService.findOneById(
            saleProductInput.productId,
          );
          if (!product) {
            throw new InternalServerErrorException('Produto não encontrado.');
          }

          if (product.stock < saleProductInput.quantity) {
            throw new BadRequestException(
              `Estoque insuficiente para o produto ${product.name}. Quantidade disponível: ${product.stock}, Quantidade solicitada: ${saleProductInput.quantity}.`,
            );
          }

          product.stock -= saleProductInput.quantity;
          await this.productRepository.save(product);

          const saleProduct = new SaleProduct();
          saleProduct.product = product;
          saleProduct.quantity = saleProductInput.quantity;
          saleProduct.unitPrice = product.price;
          saleProduct.totalPrice = saleProductInput.quantity * product.price;
          saleProduct.sale = sale;

          totalValue += saleProduct.totalPrice;

          return saleProduct;
        }),
      );

      sale.totalValue = totalValue;

      return await this.saleRepository.save(sale);
    } catch (error) {
      throw new InternalServerErrorException(
        'Falha ao criar a venda.',
        error.message,
      );
    }
  }

  async update(id: string, updateSaleInput: UpdateSaleInput): Promise<Sale> {
    const { saleProducts, customerId, ...saleData } = updateSaleInput;

    try {
      const sale = await this.saleRepository.findOne({
        where: { id },
        relations: ['saleProducts', 'saleProducts.product', 'customer'],
      });

      if (!sale) {
        throw new InternalServerErrorException('Venda não encontrada.');
      }

      if (customerId) {
        const customer = await this.clientRepository.findOne({
          where: { id: customerId },
        });
        if (!customer) {
          throw new InternalServerErrorException('Cliente não encontrado.');
        }
        if (!cpf.isValid(customer.cpf)) {
          throw new BadRequestException('CPF do cliente é inválido.');
        }
        sale.customer = customer;
      }

      Object.assign(sale, saleData);

      if (saleProducts) {
        if (saleProducts.length < 1) {
          throw new BadRequestException(
            'A venda deve ter pelo menos um produto.',
          );
        }

        for (const saleProductInput of saleProducts) {
          const product = await this.productService.findOneById(
            saleProductInput.productId,
          );
          if (!product) {
            throw new InternalServerErrorException('Produto não encontrado.');
          }
          if (product.stock < saleProductInput.quantity) {
            throw new BadRequestException(
              `Estoque insuficiente para o produto ${product.name}. Quantidade disponível: ${product.stock}, Quantidade solicitada: ${saleProductInput.quantity}.`,
            );
          }
        }

        for (const saleProduct of sale.saleProducts) {
          const product = saleProduct.product;
          if (!product) {
            throw new InternalServerErrorException(
              'Produto não encontrado durante a atualização de estoque.',
            );
          }
          product.stock += saleProduct.quantity;
          await this.productRepository.save(product);
        }

        await this.saleProductRepository.delete({ sale });

        let totalValue = 0;

        sale.saleProducts = await Promise.all(
          saleProducts.map(async (saleProductInput) => {
            const product = await this.productService.findOneById(
              saleProductInput.productId,
            );
            if (!product) {
              throw new InternalServerErrorException('Produto não encontrado.');
            }

            product.stock -= saleProductInput.quantity;
            await this.productRepository.save(product);

            const saleProduct = new SaleProduct();
            saleProduct.product = product;
            saleProduct.quantity = saleProductInput.quantity;
            saleProduct.unitPrice = product.price;
            saleProduct.totalPrice = saleProductInput.quantity * product.price;
            saleProduct.sale = sale;

            totalValue += saleProduct.totalPrice;

            return saleProduct;
          }),
        );

        sale.totalValue = totalValue;
      }

      return await this.saleRepository.save(sale);
    } catch (error) {
      console.error('Erro ao atualizar a venda:', error.message);
      if (error instanceof InternalServerErrorException) {
        throw error;
      }
      throw new InternalServerErrorException('Falha ao atualizar a venda.');
    }
  }

  async remove(id: string): Promise<boolean> {
    try {
      const sale = await this.saleRepository.findOne({
        where: { id },
        relations: ['saleProducts'],
      });

      if (!sale) {
        throw new InternalServerErrorException('Venda não encontrada.');
      }

      for (const saleProduct of sale.saleProducts) {
        const product = await this.productService.findOneById(
          saleProduct.product.id,
        );

        product.stock += saleProduct.quantity;
        await this.productRepository.save(product);
      }

      await this.saleRepository.delete(id);
      return true;
    } catch (error) {
      throw new InternalServerErrorException('Falha ao deletar a venda.');
    }
  }

  async findAll(): Promise<Sale[]> {
    try {
      return await this.saleRepository.find({
        relations: ['saleProducts', 'saleProducts.product', 'customer'],
      });
    } catch (error) {
      throw new InternalServerErrorException('Falha ao buscar as vendas.');
    }
  }

  async findOneById(id: string): Promise<Sale> {
    try {
      return await this.saleRepository.findOne({
        where: { id },
        relations: ['saleProducts', 'saleProducts.product', 'customer'],
      });
    } catch (error) {
      throw new InternalServerErrorException('Falha ao buscar a venda.');
    }
  }
}

import {
  Injectable,
  InternalServerErrorException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  Product,
  DigitalProduct,
  ConfigurableProduct,
  GroupedProduct,
} from './entities/product.entity';
import { ProductType } from './entities/product-type.enum';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { CreateDigitalProductInput } from './dto/create-digital-product.input';
import { CreateConfigurableProductInput } from './dto/create-configurable-product.input';
import { CreateGroupedProductInput } from './dto/create-grouped-product.input';
import { UpdateDigitalProductInput } from './dto/update-digital-product.input';
import { UpdateConfigurableProductInput } from './dto/update-configurable-product.input';
import { UpdateGroupedProductInput } from './dto/update-grouped-product.input';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductInput: CreateProductInput): Promise<Product> {
    try {
      const product = this.productRepository.create({
        ...createProductInput,
        type: ProductType.SIMPLE,
      });
      return await this.productRepository.save(product);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Nome do produto já existe.');
      }
      throw new InternalServerErrorException('Falha ao criar o produto.');
    }
  }

  async createDigitalProduct(
    createDigitalProductInput: CreateDigitalProductInput,
  ): Promise<DigitalProduct> {
    try {
      if (!createDigitalProductInput.downloadLink) {
        throw new BadRequestException('O link para download é obrigatório.');
      }

      const digitalProduct = this.productRepository.create({
        ...createDigitalProductInput,
        type: ProductType.DIGITAL,
      }) as DigitalProduct;
      return await this.productRepository.save(digitalProduct);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Nome do produto digital já existe.');
      }
      throw new InternalServerErrorException(
        'Falha ao criar o produto digital.',
      );
    }
  }

  async createConfigurableProduct(
    createConfigurableProductInput: CreateConfigurableProductInput,
  ): Promise<ConfigurableProduct> {
    try {
      if (
        !createConfigurableProductInput.color ||
        !createConfigurableProductInput.size
      ) {
        throw new BadRequestException(
          'O produto configurável deve ter pelo menos duas características: cor e tamanho.',
        );
      }

      const configurableProduct = this.productRepository.create({
        ...createConfigurableProductInput,
        type: ProductType.CONFIGURABLE,
      }) as ConfigurableProduct;
      return await this.productRepository.save(configurableProduct);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Nome do produto configurável já existe.');
      }
      throw new InternalServerErrorException(
        'Falha ao criar o produto configurável.',
      );
    }
  }

  async createGroupedProduct(
    createGroupedProductInput: CreateGroupedProductInput,
  ): Promise<GroupedProduct> {
    try {
      if (createGroupedProductInput.associatedProducts.length < 2) {
        throw new BadRequestException(
          'O produto agrupado deve ter pelo menos dois produtos associados.',
        );
      }

      const groupedProduct = this.productRepository.create({
        ...createGroupedProductInput,
        type: ProductType.GROUPED,
      }) as GroupedProduct;
      return await this.productRepository.save(groupedProduct);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Nome do produto agrupado já existe.');
      }
      throw new InternalServerErrorException(
        'Falha ao criar o produto agrupado.',
      );
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
      if (error.code === '23505') {
        throw new ConflictException('Nome do produto já existe.');
      }
      throw new InternalServerErrorException('Falha ao atualizar o produto.');
    }
  }

  async updateDigitalProduct(
    id: string,
    updateDigitalProductInput: UpdateDigitalProductInput,
  ): Promise<DigitalProduct> {
    try {
      if (updateDigitalProductInput.downloadLink === undefined) {
        throw new BadRequestException('O link para download é obrigatório.');
      }

      await this.productRepository.update(id, updateDigitalProductInput);
      const digitalProduct = (await this.productRepository.findOne({
        where: { id, type: ProductType.DIGITAL },
      })) as DigitalProduct;
      return digitalProduct;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Nome do produto digital já existe.');
      }
      throw new InternalServerErrorException(
        'Falha ao atualizar o produto digital.',
      );
    }
  }

  async updateConfigurableProduct(
    id: string,
    updateConfigurableProductInput: UpdateConfigurableProductInput,
  ): Promise<ConfigurableProduct> {
    try {
      if (
        updateConfigurableProductInput.color === undefined ||
        updateConfigurableProductInput.size === undefined
      ) {
        throw new BadRequestException(
          'O produto configurável deve ter pelo menos duas características: cor e tamanho.',
        );
      }

      await this.productRepository.update(id, updateConfigurableProductInput);
      const configurableProduct = (await this.productRepository.findOne({
        where: { id, type: ProductType.CONFIGURABLE },
      })) as ConfigurableProduct;
      return configurableProduct;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Nome do produto configurável já existe.');
      }
      throw new InternalServerErrorException(
        'Falha ao atualizar o produto configurável.',
      );
    }
  }

  async updateGroupedProduct(
    id: string,
    updateGroupedProductInput: UpdateGroupedProductInput,
  ): Promise<GroupedProduct> {
    try {
      if (
        updateGroupedProductInput.associatedProducts &&
        updateGroupedProductInput.associatedProducts.length < 2
      ) {
        throw new BadRequestException(
          'O produto agrupado deve ter pelo menos dois produtos associados.',
        );
      }

      await this.productRepository.update(id, updateGroupedProductInput);
      const groupedProduct = (await this.productRepository.findOne({
        where: { id, type: ProductType.GROUPED },
      })) as GroupedProduct;
      return groupedProduct;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Nome do produto agrupado já existe.');
      }
      throw new InternalServerErrorException(
        'Falha ao atualizar o produto agrupado.',
      );
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

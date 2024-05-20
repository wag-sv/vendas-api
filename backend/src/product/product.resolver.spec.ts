import { Test, TestingModule } from '@nestjs/testing';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TestUtils } from 'src/commom/test/TestUtils';

describe('ProductResolver', () => {
  let resolver: ProductResolver;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        ProductResolver,
        ProductService,
        {
          provide: getRepositoryToken(Product),
          useValue: TestUtils.mockRepository,
        },
      ],
    }).compile();

    resolver = module.get<ProductResolver>(ProductResolver);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});

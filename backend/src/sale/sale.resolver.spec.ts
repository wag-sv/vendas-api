import { Test, TestingModule } from '@nestjs/testing';
import { SaleResolver } from './sale.resolver';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Sale } from './entities/sale.entity';
import { SaleService } from './sale.service';
import { TestUtils } from 'src/commom/test/TestUtils';

describe('SaleResolver', () => {
  let resolver: SaleResolver;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SaleResolver,
        SaleService,
        {
          provide: getRepositoryToken(Sale),
          useValue: TestUtils.mockRepository,
        },
      ],
    }).compile();

    resolver = module.get<SaleResolver>(SaleResolver);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});

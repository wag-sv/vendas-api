import { Test, TestingModule } from '@nestjs/testing';
import { SaleService } from './sale.service';
import { Sale } from './entities/sale.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TestUtils } from 'src/commom/test/TestUtils';

describe('SaleService', () => {
  let service: SaleService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SaleService,
        {
          provide: getRepositoryToken(Sale),
          useValue: TestUtils.mockRepository,
        },
      ],
    }).compile();

    service = module.get<SaleService>(SaleService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

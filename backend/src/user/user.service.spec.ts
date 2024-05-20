import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';

const mockRepository = {
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

const getAValidUser = () => {
  return {
    id: '00000000-0000-0000-0000-000000000000',
    name: 'Test User',
    email: 'test.user@example.com',
    password: 'userPassword123',
  };
};

describe('UserService', () => {
  let service: UserService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve ser definido', () => {
    expect(service).toBeDefined();
  });

  describe('Criação de usuários', () => {
    it('deve criar e retornar um usuário com sucesso quando dados válidos são fornecidos', async () => {
      const user = getAValidUser();
      mockRepository.create.mockReturnValue(user);
      mockRepository.save.mockReturnValue(user);
      const result = await service.create(user);
      expect(result).toEqual(user);
      expect(mockRepository.create).toHaveBeenCalledTimes(1);
      expect(mockRepository.save).toHaveBeenCalledTimes(1);
    });

    it('deve lançar um erro quando a criação falhar devido a problemas no banco de dados', async () => {
      const user = getAValidUser();
      mockRepository.create.mockReturnValue(user);
      mockRepository.save.mockImplementation(() => {
        throw new Error('Erro no banco de dados');
      });
      await expect(service.create(user)).rejects.toThrow();
      expect(mockRepository.create).toHaveBeenCalledTimes(1);
      expect(mockRepository.save).toHaveBeenCalledTimes(1);
    });
  });

  describe('Atualização de usuário', () => {
    it('deve atualizar e retornar um usuário quando atualizações válidas e um ID de usuário são fornecidos', async () => {
      const user = getAValidUser();
      const updatedUser = { ...user, name: 'Updated Name' };
      mockRepository.update.mockReturnValue(updatedUser);
      mockRepository.findOne.mockReturnValue(updatedUser);
      const result = await service.update(user.id, updatedUser);
      expect(result).toEqual(updatedUser);
      expect(mockRepository.update).toHaveBeenCalledTimes(1);
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
    });

    it('deve lançar um erro durante a atualização do usuário quando operações de atualização no banco falham', async () => {
      const user = getAValidUser();
      mockRepository.update.mockImplementation(() => {
        throw new Error();
      });
      await expect(service.update(user.id, user)).rejects.toThrow();
      expect(mockRepository.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('Remoção de usuário', () => {
    it('deve confirmar a exclusão do usuário com um status de sucesso quando um ID de usuário válido é fornecido', async () => {
      const user = getAValidUser();
      mockRepository.delete.mockReturnValue(true);
      const result = await service.remove(user.id);
      expect(result).toBeTruthy();
      expect(mockRepository.delete).toHaveBeenCalledTimes(1);
    });

    it('deve lançar um erro quando a exclusão do usuário falhar devido a um erro no banco de dados', async () => {
      const user = getAValidUser();
      mockRepository.delete.mockImplementation(() => {
        throw new Error();
      });
      await expect(service.remove(user.id)).rejects.toThrow();
      expect(mockRepository.delete).toHaveBeenCalledTimes(1);
    });
  });

  describe('Busca de todos os usuários', () => {
    it('deve retornar uma lista de usuários quando existem múltiplos usuários no banco de dados', async () => {
      const user = getAValidUser();
      const usersArray = [user, user, user];
      mockRepository.find.mockReturnValue(usersArray);
      const result = await service.findAll();
      expect(result).toEqual(usersArray);
      expect(mockRepository.find).toHaveBeenCalledTimes(1);
    });

    it('deve lançar um erro quando a busca por todos os usuários falhar devido a um erro no banco de dados', async () => {
      mockRepository.find.mockImplementation(() => {
        throw new Error();
      });
      await expect(service.findAll()).rejects.toThrow();
      expect(mockRepository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('Busca de um usuário específico', () => {
    it('deve buscar e retornar um único usuário dado um ID de usuário válido', async () => {
      const user = getAValidUser();
      mockRepository.findOne.mockReturnValue(user);
      const result = await service.findOneById(user.id);
      expect(result).toEqual(user);
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
    });

    it('deve buscar e retornar um único usuário dado um email de usuário válido', async () => {
      const user = getAValidUser();
      mockRepository.findOne.mockReturnValue(user);
      const result = await service.findOneByEmail(user.email);
      expect(result).toEqual(user);
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
    });

    it('deve lançar um erro quando a busca falhar devido a um ID de usuário inexistente', async () => {
      const user = getAValidUser();
      mockRepository.findOne.mockImplementation(() => {
        throw new Error();
      });
      await expect(service.findOneById(user.id)).rejects.toThrow();
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
    });

    it('deve lançar um erro quando a busca falhar devido a um email de usuário inexistente', async () => {
      const user = getAValidUser();
      mockRepository.findOne.mockImplementation(() => {
        throw new Error();
      });
      await expect(service.findOneByEmail(user.email)).rejects.toThrow();
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
    });
  });
});

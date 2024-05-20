import { Test, TestingModule } from '@nestjs/testing';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { User } from './entities/user.entity';

const mockUserService = {
  create: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
  findAll: jest.fn(),
  findOneById: jest.fn(),
  findOneByEmail: jest.fn(),
};

const getMockUser = (): User => {
  return {
    id: '00000000-0000-0000-0000-000000000000',
    name: 'Test User',
    email: 'test.user@example.com',
    password: 'userPassword123',
  };
};

describe('UserResolver', () => {
  let resolver: UserResolver;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserResolver,
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    resolver = module.get<UserResolver>(UserResolver);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve ser definido', () => {
    expect(resolver).toBeDefined();
  });

  describe('Mutation: createUser', () => {
    it('deve criar um novo usuário', async () => {
      const mockUser = getMockUser();
      mockUserService.create.mockResolvedValue(mockUser);
      const result = await resolver.createUser(mockUser);
      expect(result).toEqual(mockUser);
      expect(mockUserService.create).toHaveBeenCalledWith(mockUser);
    });
  });

  describe('Mutation: updateUser', () => {
    it('deve atualizar um usuário existente', async () => {
      const mockUser = getMockUser();
      mockUserService.update.mockResolvedValue(mockUser);
      const result = await resolver.updateUser(mockUser.id, mockUser);
      expect(result).toEqual(mockUser);
      expect(mockUserService.update).toHaveBeenCalledWith(
        mockUser.id,
        mockUser,
      );
    });
  });

  describe('Mutation: deleteUser', () => {
    it('deve deletar um usuário', async () => {
      const mockUser = getMockUser();
      mockUserService.remove.mockResolvedValue(true);
      const result = await resolver.removeUser(mockUser.id);
      expect(result).toBeTruthy();
      expect(mockUserService.remove).toHaveBeenCalledWith(mockUser.id);
    });
  });

  describe('Query: getUsers', () => {
    it('deve retornar uma lista de usuários', async () => {
      const mockUser = getMockUser();
      mockUserService.findAll.mockResolvedValue([mockUser, mockUser, mockUser]);
      const result = await resolver.getUsers();
      expect(result).toHaveLength(3);
      expect(mockUserService.findAll).toHaveBeenCalled();
    });
  });

  describe('Query: getUserById', () => {
    it('deve retornar um usuário específico dado um ID', async () => {
      const mockUser = getMockUser();
      mockUserService.findOneById.mockResolvedValue(mockUser);
      const result = await resolver.getUserById(mockUser.id);
      expect(result).toEqual(mockUser);
      expect(mockUserService.findOneById).toHaveBeenCalledWith(mockUser.id);
    });
  });

  describe('Query: getUserByEmail', () => {
    it('deve retornar um usuário específico dado um email', async () => {
      const mockUser = getMockUser();
      mockUserService.findOneByEmail.mockResolvedValue(mockUser);
      const result = await resolver.getUserByEmail(mockUser.email);
      expect(result).toEqual(mockUser);
      expect(mockUserService.findOneByEmail).toHaveBeenCalledWith(
        mockUser.email,
      );
    });
  });
});

import { User } from 'src/user/user.entity';

export class TestUtils {
  static getAValidUser(): User {
    const user = new User();
    user.id = '00000000-0000-0000-0000-000000000000';
    user.name = 'Test User';
    user.email = 'test.user@example.com';
    user.password = '123456';
    return user;
  }

  static mockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };
}

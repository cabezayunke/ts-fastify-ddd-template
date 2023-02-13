import 'reflect-metadata';
import { connectTestDb, disconnectTestDb, getRequest } from '../../bootstrap';
import { GetUserUseCase } from '../../../src/users/use-cases/GetUserUseCase';
import { container } from '../../../src/users';
import { UserData } from '../UserData';
import { faker } from '@faker-js/faker';
import { UserRepository } from '../../../src/users/data';

describe('GetUserUseCase', () => {
  const user = {
    id: faker.database.mongodbObjectId(),
    name: faker.name.firstName(),
    email: faker.internet.email()
  };
  const repository = {
    find: jest.fn(() => [user]),
    remove: jest.fn(() => 'fakeKey removed'),
    save: jest.fn(() => 'fakeKey saved')
  } as unknown as UserRepository;
  const useCase = new GetUserUseCase(repository);

  test('should get user', async () => {
    //arrange

    //act
    const result = await useCase.execute({ userId: user.id });

    //assert
    expect(result.name).toEqual(user.name);
    expect(result.email).toEqual(user.email);
  });
});

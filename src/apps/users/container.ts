import { ContainerBuilder } from 'diod';

import { GetUserUseCase } from '../../contexts/users/application/GetUserByIdQueryHandler';
import { UserRepository } from '../../contexts/users/domain/UserRepository';
import { MongoUserRepository } from '../../contexts/users/infrastructure/MongoUserRepository';

const builder = new ContainerBuilder();
builder.register(UserRepository).use(MongoUserRepository);
builder.registerAndUse(GetUserUseCase);

const container = builder.build();

export { container };

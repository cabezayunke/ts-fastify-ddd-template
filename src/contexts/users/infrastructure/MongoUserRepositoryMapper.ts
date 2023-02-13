import { User, UserParams } from '../domain/User';

export class MongoUserRepositoryMapper {
  fromDomain(user: User): Record<string, unknown> {
    return {};
  }

  toDomain(data: Record<string, unknown>): User {
    return User.of({ id: data.id } as UserParams);
  }
}

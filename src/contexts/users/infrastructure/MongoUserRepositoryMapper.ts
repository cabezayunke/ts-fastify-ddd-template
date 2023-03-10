import { User } from '../domain/User';

export class MongoUserRepositoryMapper {
  fromDomain(user: User): Record<string, unknown> {
    return {
      id: user.id ? user.id?.value() : undefined,
      name: user.name.value(),
      email: user.email.value()
    };
  }

  toDomain(data: Record<string, unknown>): User {
    // return User.fromPrimitives(data);
    return User.
  }
}

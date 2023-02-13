import { Service } from 'diod';
import { User } from '../domain/User';
import { UserRepository } from '../domain/UserRepository';
import { MongoUserRepositoryMapper } from './MongoUserRepositoryMapper';
import { User as UserModel } from './UserModel';

@Service()
export class MongoUserRepository extends UserRepository {
  mapper: MongoUserRepositoryMapper;

  constructor() {
    super();
    this.mapper = new MongoUserRepositoryMapper();
  }

  async find(criteria: Record<string, unknown>): Promise<User | User[]> {
    const { id, ...rest } = criteria;
    if (id) {
      const result = await UserModel.findById(id).lean({ virtuals: true });
      return this.mapper.toDomain(result as Record<string, unknown>);
    }
    const results = await UserModel.find(rest).lean({ virtuals: true });
    return results.map(this.mapper.toDomain);
  }

  async remove(user: User): Promise<void> {
    await UserModel.remove({ _id: user.id });
  }

  async save(data: User): Promise<void> {
    if (data.id) {
      await UserModel.updateOne(this.mapper.fromDomain(data));
    } else {
      await UserModel.create(this.mapper.fromDomain(data));
    }
  }
}

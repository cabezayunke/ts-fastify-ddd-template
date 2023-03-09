import { Repository } from '../../../shared/domain/data/Repository';
import { User } from './User';
import { UserId } from './UserId';

export abstract class UserRepository implements Repository<UserId, User> {
  abstract find(data: Record<string, unknown>): Promise<User | User[]>;

  abstract remove(user: UserId): Promise<void>;

  abstract save(user: User): Promise<void>;
}

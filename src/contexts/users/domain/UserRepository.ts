import { Repository } from '../../../shared';
import { User } from './User';

export abstract class UserRepository implements Repository<User> {
  find(data: Record<string, unknown>): Promise<User | User[]> {
    throw new Error('Method not implemented.');
  }

  remove(user: User): Promise<void> {
    throw new Error('Method not implemented.');
  }

  save(user: User): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

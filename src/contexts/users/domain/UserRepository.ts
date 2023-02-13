import { Repository } from '../../../shared';
import { UserDto } from '../infrastructure/UserModel';

export abstract class UserRepository implements Repository<UserDto> {
  find(_: Record<string, unknown>): Promise<UserDto[]> {
    throw new Error('Method not implemented.');
  }
  remove(_: string): Promise<string> {
    throw new Error('Method not implemented.');
  }
  save(_: UserDto): Promise<string> {
    throw new Error('Method not implemented.');
  }
}

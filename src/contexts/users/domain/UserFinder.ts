import { UserNotFound } from './error/UserNotFound';
import { User } from './User';
import { UserRepository } from './UserRepository';
import { UserId } from './value-object/UserId';

export class UserFinder {
  constructor(private readonly userRepository: UserRepository) {}

  async find(userId: UserId): Promise<User> {
    const user = await this.userRepository.find({ id: userId.value() });
    if (!user) {
      throw new UserNotFound();
    }
    return user as User;
  }
}

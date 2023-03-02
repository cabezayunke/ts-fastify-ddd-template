import { User } from './User';
import { UserId } from './UserId';
import { UserNotFound } from './UserNotFound';
import { UserRepository } from './UserRepository';

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

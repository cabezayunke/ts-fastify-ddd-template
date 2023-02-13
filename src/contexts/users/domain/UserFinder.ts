import { User } from './User';
import { UserId } from './UserId';
import { UserNotFound } from './UserNotFound';
import { UserRepository } from './UserRepository';

export class UserFinder {
  constructor(private readonly userRepository: UserRepository) {}

  find(userId: UserId): User {
    const user = this.userRepository.find({ id: userId.value() });
    if (!user) {
      throw new UserNotFound();
    }
    return user;
  }
}

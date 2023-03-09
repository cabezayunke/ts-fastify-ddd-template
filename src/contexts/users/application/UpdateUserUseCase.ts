import { User } from '../domain/User';
import { UserRepository } from '../domain/UserRepository';

export interface UpdateUserInput {
  id: string;
  name: string;
  email: string;
}

export class UpdateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(userData: UpdateUserInput): Promise<void> {
    await this.userRepository.save(User.of(userData));
  }
}

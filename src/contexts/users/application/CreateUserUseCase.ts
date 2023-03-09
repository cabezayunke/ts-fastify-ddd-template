import { User } from '../domain/User';
import { UserRepository } from '../domain/UserRepository';

export interface CreateUserInput {
  name: string;
  email: string;
}
export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(userData: CreateUserInput): Promise<void> {
    await this.userRepository.save(User.of(userData));
  }
}

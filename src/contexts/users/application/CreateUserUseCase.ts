import { UserDto, UserRepository } from '../infrastructure';

export type CreateUserInput = UserDto;

export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(userData: UserDto): Promise<void> {
    await this.userRepository.save(userData);
  }
}

import { UserDto, UserRepository } from '../infrastructure';

export interface UpdateUserInput extends UserDto {
  id: string;
}

export class UpdateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(userData: UpdateUserInput): Promise<void> {
    await this.userRepository.save(userData);
  }
}

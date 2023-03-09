import { Service } from 'diod';
import { UserRepository } from '../domain/UserRepository';

export interface DeleteUserInput {
  userId: string;
}

@Service()
export class GetUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({ userId }: DeleteUserInput): Promise<void> {
    await this.userRepository.find({ id: userId });
  }
}

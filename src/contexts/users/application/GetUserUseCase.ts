import { Service } from 'diod';
import { ApiError } from '../../../shared/infrastructure/server/ApiError';
import { User } from '../domain/User';
import { UserId } from '../domain/UserId';
import { UserRepository } from '../domain/UserRepository';

export interface GetUserInput {
  userId: string;
}

export interface GetUserOutput {
  id: string;
  name: string;
  email: string;
}

@Service()
export class GetUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({ userId }: GetUserInput): Promise<GetUserOutput> {
    const found = await this.userRepository.find({ id: userId });
    const isArrayResult = Array.isArray(found);
    if (!found || (isArrayResult && !found.length)) {
      throw ApiError.notFound('User not found', { userId });
    }
    const result = (isArrayResult ? found[0] : found) as User;

    return {
      id: (result?.id as UserId).value(),
      name: result.name.value(),
      email: result.email.value()
    };
  }
}

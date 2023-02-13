import { UserRepository, UserDto } from "../data"

export interface CreateUserInput extends UserDto {}

export class CreateUserUseCase {
    constructor(
        private readonly userRepository: UserRepository,
      ) {}
    
      async execute(userData: UserDto): Promise<void> {
        await this.userRepository.save(userData)
      }
}
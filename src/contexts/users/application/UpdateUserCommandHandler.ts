import { Command } from 'shared/domain/commands/Command';
import { CommandHandler } from 'shared/domain/commands/CommandHandler';
import { UserRepository } from '../domain/UserRepository';
import { UpdateUserCommand } from './UpdateUserCommand';

export interface UpdateUserInput {
  id: string;
  name: string;
  email: string;
}

export class UpdateUserCommandHandler implements CommandHandler<UpdateUserCommand> {
  constructor(private readonly userRepository: UserRepository) {}

  subscribedTo(): Command {
    return UpdateUserCommand;
  }

  async handle(command: UpdateUserCommand): Promise<void> {
    // TODO: update user
  }
}

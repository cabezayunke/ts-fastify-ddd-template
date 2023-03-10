import { Command } from 'shared/domain/commands/Command';
import { CommandHandler } from 'shared/domain/commands/CommandHandler';
import { UserRepository } from '../domain/UserRepository';

type UpdateUserCommandData = {
  name?: string;
  email?: string;
};

export class UpdateUserCommand extends Command {
  readonly name?: string;
  readonly email?: string;

  constructor(readonly id: string, readonly data: UpdateUserCommandData) {
    super();
    this.name = this.data.name;
    this.email = this.data.email;
  }
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

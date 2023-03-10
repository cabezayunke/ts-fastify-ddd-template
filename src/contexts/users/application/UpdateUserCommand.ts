import { Command } from '../../../shared/domain/commands/Command';

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

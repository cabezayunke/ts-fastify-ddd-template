import { Command } from '../commands/Command';
import { DomainError } from './DomainError';

export class CommandNotRegisteredError extends DomainError {
  constructor(command: Command) {
    super(
      `The command <${command.constructor.name}> hasn't a command handler associated`
    );
  }
}

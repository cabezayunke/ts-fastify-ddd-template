import { Command } from '../../domain/commands/Command';
import { CommandBus } from '../../domain/commands/CommandBus';
import { CommandHandlersInformation } from './CommandHandlersInformation';

export class InMemoryCommandBus implements CommandBus {
  constructor(private commandHandlersInformation: CommandHandlersInformation) {}

  async dispatch(command: Command): Promise<void> {
    const handler = this.commandHandlersInformation.search(command);

    await handler.handle(command);
  }
}

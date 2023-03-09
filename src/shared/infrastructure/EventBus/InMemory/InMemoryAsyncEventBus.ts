import { DomainEvent } from '../../../domain/events/DomainEvent';
import { DomainEventMapping } from '../../../domain/events/DomainEventMapping';
import { DomainEventSubscriber } from '../../../domain/events/DomainEventSubscriber';
import { EventBus } from '../../../domain/events/EventBus';
import { Logger } from '../../../domain/Logger';
import { EventEmitterBus } from '../EventEmitterBus';

export class InMemoryAsyncEventBus implements EventBus {
  private bus: EventEmitterBus;

  constructor(
    subscribers: Array<DomainEventSubscriber<DomainEvent>>,
    private readonly logger: Logger
  ) {
    this.bus = new EventEmitterBus(subscribers);
  }

  async start(): Promise<void> {
    this.logger.debug('[InMemoryAsyncEventBus] Empty start()');
  }

  async publish(events: DomainEvent[]): Promise<void> {
    this.bus.publish(events);
  }

  addSubscribers(subscribers: Array<DomainEventSubscriber<DomainEvent>>): void {
    this.bus.registerSubscribers(subscribers);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setDomainEventMapping(_domainEventMapping: DomainEventMapping): void {
    this.logger.debug('[InMemoryAsyncEventBus] Empty setDomainEventMapping()');
  }
}

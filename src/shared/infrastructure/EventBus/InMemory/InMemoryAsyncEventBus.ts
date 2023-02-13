import { DomainEventSubscriber } from '../../../domain/DomainEventSubscriber';
import { EventBus } from '../../../domain/EventBus';
import { DomainEvent } from '../../../domain/events/DomainEvent';
import { DomainEventMapping } from '../../../domain/events/DomainEventMapping';
import { EventEmitterBus } from '../EventEmitterBus';

export class InMemoryAsyncEventBus implements EventBus {
  private bus: EventEmitterBus;

  constructor(subscribers: Array<DomainEventSubscriber<DomainEvent>>) {
    this.bus = new EventEmitterBus(subscribers);
  }

  async start(): Promise<void> {}

  async publish(events: DomainEvent[]): Promise<void> {
    this.bus.publish(events);
  }

  addSubscribers(subscribers: Array<DomainEventSubscriber<DomainEvent>>) {
    this.bus.registerSubscribers(subscribers);
  }

  setDomainEventMapping(domainEventMapping: DomainEventMapping): void {}
}

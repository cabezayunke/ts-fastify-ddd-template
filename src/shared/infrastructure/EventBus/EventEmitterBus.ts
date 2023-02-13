import { EventEmitter } from 'events';
import { DomainEventSubscriber } from 'shared/domain/events/DomainEventSubscriber';
import { DomainEvent, DomainEventClass } from '../../domain/events/DomainEvent';

export class EventEmitterBus extends EventEmitter {
  constructor(subscribers: Array<DomainEventSubscriber<DomainEvent>>) {
    super();

    this.registerSubscribers(subscribers);
  }

  registerSubscribers(subscribers?: DomainEventSubscriber<DomainEvent>[]): void {
    subscribers?.map(subscriber => {
      this.registerSubscriber(subscriber);
    });
  }

  private registerSubscriber(subscriber: DomainEventSubscriber<DomainEvent>): void {
    subscriber.subscribedTo().map((event: DomainEventClass) => {
      this.on(event.eventName, subscriber.on.bind(subscriber));
    });
  }

  publish(events: DomainEvent[]): void {
    events.map(event => this.emit(event.eventName, event));
  }
}

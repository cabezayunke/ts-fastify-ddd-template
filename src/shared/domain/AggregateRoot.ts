import { DomainEvent } from './events/DomainEvent';

export abstract class AggregateRoot {
  private domainEvents: Array<DomainEvent>;

  constructor() {
    this.domainEvents = [];
  }

  pullEvents(): Array<DomainEvent> {
    const domainEvents = this.domainEvents.slice();
    this.domainEvents = [];

    return domainEvents;
  }

  recordEvent(event: DomainEvent): void {
    this.domainEvents.push(event);
  }

  abstract toPrimitives<T>(): T | Record<string, unknown>;
  static create: (...args: unknown[]) => unknown;
}

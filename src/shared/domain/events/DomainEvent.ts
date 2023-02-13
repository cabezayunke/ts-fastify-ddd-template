import { Uuid } from '../value-object/Uuid';

export abstract class DomainEvent {
  static fromPrimitives: (...args: unknown[]) => unknown;

  readonly aggregateId: string;
  readonly eventId: string;
  readonly occurredOn: Date;
  readonly eventName: string;

  constructor(
    eventName: string,
    aggregateId: string,
    eventId?: string,
    occurredOn?: Date
  ) {
    this.aggregateId = aggregateId;
    this.eventId = eventId || Uuid.random().value();
    this.occurredOn = occurredOn || new Date();
    this.eventName = eventName;
  }

  abstract toPrimitive(): unknown;
}

export type DomainEventClass = {
  readonly eventName: string;
  fromPrimitives(...args: unknown[]): DomainEvent;
};

import { DomainEvent } from '../../../../shared/domain/events/DomainEvent';

type UserCreatedDomainEventBody = { userEmail: string };

export class UserCreatedDomainEvent extends DomainEvent {
  static readonly eventName = 'user.created';
  readonly userEmail: string;

  constructor(data: {
    id: string;
    userEmail: string;
    eventId?: string;
    occurredOn?: Date;
  }) {
    const { id, eventId, occurredOn, userEmail } = data;
    super(UserCreatedDomainEvent.eventName, id, eventId, occurredOn);
    this.userEmail = userEmail;
  }

  toPrimitives(): Record<string, unknown> {
    return {
      userEmail: this.userEmail,
      eventName: UserCreatedDomainEvent.eventName
    };
  }

  static create(
    aggregateId: string,
    body: UserCreatedDomainEventBody,
    eventId?: string,
    occurredOn?: Date
  ): DomainEvent {
    return new UserCreatedDomainEvent({
      id: aggregateId,
      userEmail: body.userEmail,
      eventId,
      occurredOn
    });
  }
}

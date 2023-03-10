import { DomainEventClass } from '../../../shared/domain/events/DomainEvent';
import { DomainEventSubscriber } from '../../../shared/domain/events/DomainEventSubscriber';
import { UserCreatedDomainEvent } from '../domain/event/UserCreatedDomainEvent';
import { UserEmail } from '../domain/value-object/UserEmail';

export default class SendWelcomeUserEmailSubscriber
  implements DomainEventSubscriber<UserCreatedDomainEvent>
{
  subscribedTo(): DomainEventClass[] {
    return [UserCreatedDomainEvent];
  }

  async on(domainEvent: UserCreatedDomainEvent): Promise<void> {
    const userEmail = UserEmail.of(domainEvent.userEmail);
    // TODO: send email here
    // eslint-disable-next-line no-console
    console.log('Sending email... ', userEmail.value());
  }
}

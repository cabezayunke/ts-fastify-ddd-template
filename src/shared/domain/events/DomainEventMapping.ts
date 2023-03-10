import { DomainEvent, DomainEventClass } from './DomainEvent';
import { DomainEventSubscriber } from './DomainEventSubscriber';

type Mapping = Map<string, DomainEventClass>;

export class DomainEventMapping {
  private mapping: Mapping;

  constructor(mapping: DomainEventSubscriber<DomainEvent>[]) {
    this.mapping = mapping.reduce(
      this.eventsExtractor(),
      new Map<string, DomainEventClass>()
    );
  }

  private eventsExtractor() {
    return (map: Mapping, subscriber: DomainEventSubscriber<DomainEvent>) => {
      subscriber.subscribedTo().forEach(this.eventNameExtractor(map));
      return map;
    };
  }

  private eventNameExtractor(map: Mapping): (domainEvent: DomainEventClass) => void {
    return domainEvent => {
      const eventName = domainEvent.eventName;
      map.set(eventName, domainEvent);
    };
  }

  for(name: string): DomainEventClass | undefined {
    const domainEvent = this.mapping.get(name);

    if (!domainEvent) {
      return;
    }

    return domainEvent;
  }
}

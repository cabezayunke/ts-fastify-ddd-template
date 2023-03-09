import { DomainEvent } from '../../../domain/events/DomainEvent';
import { DomainEventMapping } from '../../../domain/events/DomainEventMapping';
import { DomainEventSubscriber } from '../../../domain/events/DomainEventSubscriber';
import { EventBus } from '../../../domain/events/EventBus';
import { Logger } from '../../../domain/Logger';

type Subscription = {
  boundedCallback: (event: DomainEvent) => void;
  originalCallback: (event: DomainEvent) => void;
};

export class InMemorySyncEventBus implements EventBus {
  private subscriptions: Map<string, Array<Subscription>>;

  constructor(private readonly logger: Logger) {
    this.subscriptions = new Map();
  }

  async start(): Promise<void> {
    this.logger.debug('[InMemorySyncEventBus] Empty start()');
  }

  async publish(events: Array<DomainEvent>): Promise<void> {
    const executions: void[] = [];
    events.map((event: DomainEvent) => {
      const subscribers = this.subscriptions.get(event.eventName);
      if (subscribers) {
        return subscribers.map(subscriber =>
          executions.push(subscriber.boundedCallback(event))
        );
      }
      return undefined;
    });

    await Promise.all(executions);
  }

  addSubscribers(subscribers: Array<DomainEventSubscriber<DomainEvent>>): void {
    subscribers.map(subscriber =>
      subscriber.subscribedTo().map(event => this.subscribe(event.eventName, subscriber))
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setDomainEventMapping(_domainEventMapping: DomainEventMapping): void {
    this.logger.debug('[InMemorySyncEventBus] Empty setDomainEventMapping()');
  }

  private subscribe(topic: string, subscriber: DomainEventSubscriber<DomainEvent>): void {
    const currentSubscriptions = this.subscriptions.get(topic);
    const subscription = {
      boundedCallback: subscriber.on.bind(subscriber),
      originalCallback: subscriber.on
    };
    if (currentSubscriptions) {
      currentSubscriptions.push(subscription);
    } else {
      this.subscriptions.set(topic, [subscription]);
    }
  }
}

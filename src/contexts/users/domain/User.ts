import { AggregateRoot } from 'shared/domain/AggregateRoot';
import { UserCreatedDomainEvent } from './event/UserCreatedDomainEvent';
import { UserEmail } from './value-object/UserEmail';
import { UserId } from './value-object/UserId';
import { UserName } from './value-object/UserName';

export interface UserParams {
  id: string;
  name: string;
  email: string;
}

export class User extends AggregateRoot {
  constructor(
    private readonly _name: UserName,
    private readonly _email: UserEmail,
    private readonly _id: UserId
  ) {
    super();
  }

  get id(): UserId {
    return this._id;
  }
  get name(): UserName {
    return this._name;
  }
  get email(): UserEmail {
    return this._email;
  }

  toPrimitives<UserParams>(): UserParams {
    return {
      id: this._id.value(),
      name: this.name.value(),
      email: this.email.value()
    } as UserParams;
  }

  static create(data: UserParams): User {
    const user = new User(
      UserName.of(data.name),
      UserEmail.of(data.email),
      UserId.of(data.id)
    );

    user.recordEvent(
      UserCreatedDomainEvent.create(data.id as string, { userEmail: data.email })
    );

    return user;
  }
}

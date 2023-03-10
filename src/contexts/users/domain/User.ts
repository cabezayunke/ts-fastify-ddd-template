import { AggregateRoot } from 'shared/domain/AggregateRoot';
import { UserEmail } from './UserEmail';
import { UserId } from './UserId';
import { UserName } from './UserName';

export interface UserParams {
  id?: string;
  name: string;
  email: string;
}

export class User extends AggregateRoot {
  constructor(
    private readonly _name: UserName,
    private readonly _email: UserEmail,
    private readonly _id?: UserId
  ) {
    super();
  }

  static create(name: UserName, email: UserEmail, id?: UserId): User {
    const user = new this(name, email, id);
    // user.recordEvent(new CreateUserEvent({}));
  }

  get id(): UserId | undefined {
    return this?._id;
  }
  get name(): UserName {
    return this._name;
  }
  get email(): UserEmail {
    return this._email;
  }

  toPrimitives(): Record<string, unknown> {
    return {
      id: this._id?.value(),
      name: this.name.value(),
      email: this.email.value()
    };
  }

  fromPrimitives(data: Record<string, unknown>): User {
    return new User(data.name, data.email, data.id);
  }
}

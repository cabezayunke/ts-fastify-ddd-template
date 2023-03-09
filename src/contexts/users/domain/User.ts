import { UserEmail } from './UserEmail';
import { UserId } from './UserId';
import { UserName } from './UserName';

export interface UserParams {
  id?: string;
  name: string;
  email: string;
}

export class User {
  constructor(
    private readonly _name: UserName,
    private readonly _email: UserEmail,
    private readonly _id?: UserId
  ) {}

  static of(params: UserParams): User {
    return new this(
      UserName.of(params.name),
      UserEmail.of(params.email),
      params?.id ? UserId.of(params?.id) : undefined
    );
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
}

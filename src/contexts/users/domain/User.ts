import { UserId } from './UserId';

export interface UserParams {
  id: string;
}

export class User {
  constructor(private readonly _id: UserId) {}

  static of(params: UserParams): User {
    return new this(new UserId(params.id));
  }

  get id(): UserId {
    return this._id;
  }
}

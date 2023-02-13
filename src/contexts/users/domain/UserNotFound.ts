import { DomainError } from 'shared/domain/errors/DomainError';

export class UserNotFound extends DomainError {
  constructor() {
    super('User not found');
  }
}

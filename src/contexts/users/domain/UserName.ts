import { InvalidArgumentError } from 'shared/domain/errors/InvalidArgumentError';
import { StringValueObject } from '../../../shared/domain/value-object/StringValueObject';

export class UserName extends StringValueObject {
  static of(value: string): UserName {
    if (!value.length || value.length < 2) {
      throw new InvalidArgumentError('Name too short');
    }
    return new this(value);
  }
}

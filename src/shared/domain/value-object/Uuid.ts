import { v4 } from 'uuid';
import uuidValidate from 'uuid-validate';
import { InvalidArgumentError } from '../errors/InvalidArgumentError';
import { StringValueObject } from './StringValueObject';

export class Uuid extends StringValueObject {
  protected constructor(value: string) {
    super(value);
  }

  static of(value: string): Uuid {
    if (!uuidValidate(value, 4)) {
      throw new InvalidArgumentError(
        `<${this.constructor.name}> does not allow the value <${value}>`
      );
    }
    return new Uuid(value);
  }

  static random(): Uuid {
    return new Uuid(v4());
  }
}

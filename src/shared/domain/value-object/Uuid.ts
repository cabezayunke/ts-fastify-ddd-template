import { v4 } from 'uuid';
import uuidValidate from 'uuid-validate';
import { InvalidArgumentError } from '../errors/InvalidArgumentError';
import { StringValueObject } from './StringValueObject';

export class Uuid extends StringValueObject {

  private constructor(value: string) {
    super(value);
    if (!uuidValidate(value, 4)) {
        throw new InvalidArgumentError(`<${this.constructor.name}> does not allow the value <${value}>`);
      }
  }

  static random(): Uuid {
    return new Uuid(v4());
  }

}

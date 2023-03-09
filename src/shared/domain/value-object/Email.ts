import { StringValueObject } from './StringValueObject';

export class Email extends StringValueObject {
  protected constructor(value: string) {
    super(value);
  }

  static of(value: string): Email {
    // TODO: email validation
    // if (!validEmail) {
    //   throw new InvalidArgumentError(
    //     `<${this.constructor.name}> does not allow the value <${value}>`
    //   );
    // }
    return new Email(value);
  }
}

import { InvalidArgumentError } from "../errors/InvalidArgumentError";
import { ValueObject } from "./ValueObject";

export abstract class EnumValueObject<T> extends ValueObject<T> {

  private constructor(value: T, public readonly validValues: T[]) {
    super(value);
    if (!validValues.includes(value)) {
        throw new InvalidArgumentError(`<${this.constructor.name}> does not allow the value <${value}>`);
    }
  }
  
}

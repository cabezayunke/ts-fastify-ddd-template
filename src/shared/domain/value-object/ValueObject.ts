export abstract class ValueObject<T> {
  private readonly _value: T;

  constructor(value: T) {
    this._value = value;
  }

  value(): T {
    return this._value;
  }

  equals(o: ValueObject<T>): boolean {
    return this.value() === o.value();
  }

  toString() {
    if (this._value !== undefined && this._value !== null) {
      return this._value.toString();
    }
    return undefined;
  }
}

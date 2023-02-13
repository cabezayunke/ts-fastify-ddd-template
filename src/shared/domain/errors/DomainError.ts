export class DomainError<T = void> extends Error {
  constructor(message: string, public readonly event?: T) {
    super(message);
  }
}

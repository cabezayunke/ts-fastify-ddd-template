import { Query } from '../queries/Query';
import { DomainError } from './DomainError';

export class QueryNotRegisteredError extends DomainError {
  constructor(query: Query) {
    super(`The query <${query.constructor.name}> hasn't a query handler associated`);
  }
}

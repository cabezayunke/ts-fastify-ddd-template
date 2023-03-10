import { Query } from '../../../shared/domain/queries/Query';

export class GetUserByIdQuery extends Query {
  constructor(readonly id: string) {
    super();
  }
}

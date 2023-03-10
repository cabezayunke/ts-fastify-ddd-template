import { Service } from 'diod';
import { Query } from '../../../shared/domain/queries/Query';
import { QueryHandler } from '../../../shared/domain/queries/QueryHandler';
import { UserFinder } from '../domain/UserFinder';
import { UserId } from '../domain/value-object/UserId';

export class GetUserByIdQuery extends Query {
  constructor(readonly id: string) {
    super();
  }
}

export interface GetUserByIdQueryOutput {
  id: string;
  name: string;
  email: string;
}

@Service()
export class GetUserByIdQueryHandler
  implements QueryHandler<GetUserByIdQuery, GetUserByIdQueryOutput>
{
  constructor(private userFinder: UserFinder) {}

  subscribedTo(): Query {
    return GetUserByIdQuery;
  }

  async handle(query: GetUserByIdQuery): Promise<GetUserByIdQueryOutput> {
    const user = await this.userFinder.find(UserId.of(query.id));

    return {
      id: user.id.value(),
      name: user.name.value(),
      email: user.email.value()
    };
  }
}

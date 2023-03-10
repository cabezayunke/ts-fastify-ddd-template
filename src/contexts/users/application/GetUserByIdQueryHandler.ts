import { Service } from 'diod';
import { Query } from '../../../shared/domain/queries/Query';
import { QueryHandler } from '../../../shared/domain/queries/QueryHandler';
import { UserFinder } from '../domain/UserFinder';
import { UserId } from '../domain/value-object/UserId';
import { GetUserByIdQuery } from './GetUserByIdQuery';

export interface GetUserInput {
  userId: string;
}

export interface GetUserOutput {
  id: string;
  name: string;
  email: string;
}

@Service()
export class GetUserByIdQueryHandler
  implements QueryHandler<GetUserByIdQuery, GetUserOutput>
{
  constructor(private userFinder: UserFinder) {}

  subscribedTo(): Query {
    return GetUserByIdQuery;
  }

  async handle(query: GetUserByIdQuery): Promise<GetUserOutput> {
    const user = await this.userFinder.find(UserId.of(query.id));

    return {
      id: user.id.value(),
      name: user.name.value(),
      email: user.email.value()
    };
  }
}

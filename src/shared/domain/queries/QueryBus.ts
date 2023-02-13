import { Response } from '../Response';
import { Query } from './Query';

export interface QueryBus {
  ask<R extends Response>(query: Query): Promise<R>;
}

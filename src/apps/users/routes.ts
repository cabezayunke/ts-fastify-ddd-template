import { FastifyInstance } from 'fastify';

import getUser from './controller/getUser';

const routes = async (app: FastifyInstance): Promise<void[]> =>
  Promise.all([getUser(app)]);

export { routes };

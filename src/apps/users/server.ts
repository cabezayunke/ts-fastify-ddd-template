import { FastifyInstance } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';
import 'reflect-metadata';
import {
  MongoConnectionManager,
  MongoParams
} from '../../shared/infrastructure/data/MongoConnectionManager';
import { WinstonLogger } from '../../shared/infrastructure/logger/WinstonLogger';
import {
  buildFastifyApp,
  FastifyAppParams,
  startFastifyApp
} from '../../shared/infrastructure/server/FastifyApp';

import { appConfig, dbConfig, serverConfig } from './config';
import { routes as UserRoutes } from './routes';

const logger = new WinstonLogger();
const app: FastifyInstance<Server, IncomingMessage, ServerResponse> = buildFastifyApp(
  appConfig as FastifyAppParams
);
app.register(UserRoutes, { prefix: '/v1/users' });

const db = new MongoConnectionManager(dbConfig as unknown as MongoParams, logger);

const run = async (): Promise<void> => {
  await db.connect();
  await startFastifyApp(app, serverConfig.port, serverConfig.host);
};
run();

process.on('SIGTERM', async () => {
  logger.warn('SIGTERM signal received.');
  await app.close();
  await db.disconnect();
});

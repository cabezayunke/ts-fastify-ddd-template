import { FastifyInstance } from "fastify";
import { IncomingMessage, Server, ServerResponse } from "http";
import 'reflect-metadata';
import { buildFastifyApp, FastifyAppParams, MongoConnectionManager, startFastifyApp } from "../../shared";
import { appConfig, dbConfig, serverConfig } from './config';
import { routes as UserRoutes } from "./routes";

const app: FastifyInstance<Server, IncomingMessage, ServerResponse> = buildFastifyApp(appConfig as FastifyAppParams);
app.register(UserRoutes, { prefix: '/v1/users' })

const db = new MongoConnectionManager(dbConfig);

const run = async () => {
    await db.connect();
    await startFastifyApp(app, serverConfig.port, serverConfig.host);
}
run();

process.on('SIGTERM', async () => {
    console.warn('SIGTERM signal received.');
    await app.close()
    await db.disconnect();
});
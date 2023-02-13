import 'reflect-metadata';
import { buildFastifyApp, MongoConnectionManager } from "../src/shared";
import { dbConfig } from '../src/config';
import { routes as UserRoutes } from '../src/users';

const testApp = buildFastifyApp({
    logger: true,
    swagger: { enabled: false },
});
testApp.register(UserRoutes, { prefix: '/v1/users' })

const fakeAuthHeader = { 'authorization': 'Bearer fakeToken'}
export const getRequest = async (url: string) => testApp.inject({ url, headers: fakeAuthHeader, method: 'GET' })

let db;
export const connectTestDb = async () => {
    db = new MongoConnectionManager(dbConfig);
    await db.connect();
}
export const disconnectTestDb = async () => {
    if (db) {
        await db.disconnect();
    }        
}
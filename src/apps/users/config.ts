import * as dotenv from "dotenv";
import { getMandatoryNumberEnvVar, getMandatoryStringEnvVar, getOptionalNumberEnvVar, getOptionalStringEnvVar } from "../../shared";

const envFile = `../.env.${getOptionalStringEnvVar('NODE_ENV', 'development')}`;
dotenv.config({ path: `${__dirname}/${envFile}` });

const serverConfig = {
    port: getOptionalNumberEnvVar('SERVER_PORT', 3000),
    host: getOptionalStringEnvVar('SERVER_HOST', '0.0.0.0'),
    isProduction: process.env.NODE_ENV === 'production',
};

const appConfig = {
    logger: true,
    swagger: {
        host: 'localhost:3000',
        enabled: process.env.NODE_ENV !== 'production',
        tags: [
            {name: 'users', description: 'Users CRUD endpoints'}
        ]
    }
}

const dbConfig = {
    host: getMandatoryStringEnvVar('MONGO_HOST'),
    port: getMandatoryNumberEnvVar('MONGO_PORT'),
    user: getMandatoryStringEnvVar('MONGO_USER'),
    password: getMandatoryStringEnvVar('MONGO_PASS'),
    database: getMandatoryStringEnvVar('MONGO_DATABASE'),
    debug: getOptionalStringEnvVar('MONGO_DEBUG', 'false') === 'true',
}

export {
    serverConfig,
    appConfig,
    dbConfig
};

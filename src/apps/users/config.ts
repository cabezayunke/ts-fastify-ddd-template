import * as dotenv from 'dotenv';
import {
  getMandatoryNumberEnvVar,
  getMandatoryStringEnvVar,
  getOptionalNumberEnvVar,
  getOptionalStringEnvVar
} from 'shared/infrastructure/server/config';

const envFile = `../.env.${getOptionalStringEnvVar('NODE_ENV', 'development')}`;
dotenv.config({ path: `${__dirname}/${envFile}` });

export interface ServerConfig {
  port: number;
  host: string;
  isProduction: boolean;
}
export const serverConfig: ServerConfig = {
  port: getOptionalNumberEnvVar('SERVER_PORT', 3000),
  host: getOptionalStringEnvVar('SERVER_HOST', '0.0.0.0'),
  isProduction: process.env.NODE_ENV === 'production'
};

export interface AppConfig {
  logger: boolean;
  swagger: {
    host: string;
    enabled: boolean;
    tags: [
      {
        name: string;
        description: string;
      }
    ];
  };
}
export const appConfig: AppConfig = {
  logger: true,
  swagger: {
    host: 'localhost:3000',
    enabled: process.env.NODE_ENV !== 'production',
    tags: [{ name: 'users', description: 'Users CRUD endpoints' }]
  }
};

export interface DatabaseConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
  debug?: boolean;
}

export const dbConfig: DatabaseConfig = {
  host: getMandatoryStringEnvVar('MONGO_HOST'),
  port: getMandatoryNumberEnvVar('MONGO_PORT'),
  user: getMandatoryStringEnvVar('MONGO_USER'),
  password: getMandatoryStringEnvVar('MONGO_PASS'),
  database: getMandatoryStringEnvVar('MONGO_DATABASE'),
  debug: getOptionalStringEnvVar('MONGO_DEBUG', 'false') === 'true'
};

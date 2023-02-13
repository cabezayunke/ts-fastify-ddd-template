import { Repository } from "./domain/data/Repository";
import { AuthenticatedRequest } from "./infrastructure/controller/AuthenticatedRequest";
import { AuthHeadersSchema } from "./infrastructure/controller/AuthHeadersSchema";
import { ErrorResponseSchema } from "./infrastructure/controller/ErrorResponseSchema";
import { MongoConnectionManager } from "./infrastructure/data/MongoConnectionManager";
import { ApiError } from "./infrastructure/server/ApiError";
import { getMandatoryNumberEnvVar, getMandatoryStringEnvVar, getOptionalNumberEnvVar, getOptionalStringEnvVar } from "./infrastructure/server/config";
import { AppParams, buildApp, start } from "./infrastructure/server/FastifyApp";

export {
    ApiError,
    Repository,
    AuthenticatedRequest,
    AuthHeadersSchema,
    ErrorResponseSchema,
    getOptionalNumberEnvVar,
    getOptionalStringEnvVar,
    getMandatoryStringEnvVar,
    getMandatoryNumberEnvVar,
    buildApp as buildFastifyApp,
    start as startFastifyApp,
    AppParams as FastifyAppParams,
    MongoConnectionManager
};

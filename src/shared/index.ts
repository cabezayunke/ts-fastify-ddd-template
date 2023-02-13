import { getMandatoryNumberEnvVar, getMandatoryStringEnvVar, getOptionalNumberEnvVar, getOptionalStringEnvVar } from "./config/utils";
import { AuthenticatedRequest } from "./controller/AuthenticatedRequest";
import { AuthHeadersSchema } from "./controller/AuthHeaders";
import { ErrorResponseSchema } from "./controller/ErrorResponse";
import { MongoConnectionManager } from "./data/MongoConnectionManager";
import { Repository } from "./data/Repository";
import { ApiError } from "./error/ApiError";
import { AppParams, buildApp, start } from "./server/FastifyApp";

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
}
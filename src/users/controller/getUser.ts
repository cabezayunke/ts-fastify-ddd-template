import { FromSchema } from 'json-schema-to-ts';
import { FastifyInstance } from "fastify";
import { UserResponseSchema, UserResponseType } from "./UserResponse";
import { ErrorResponseSchema, AuthHeadersSchema, AuthenticatedRequest } from "../../shared";
import { GetUserUseCase } from '../use-cases/GetUserUseCase';
import { container } from '../index';

export const GetUserParams =  {
    type: "object",
    properties: {
      userId: { type: "string" },
    },
    required: ["userId"],
} as const;

interface GetUserRequest extends AuthenticatedRequest {
  Params: FromSchema<typeof GetUserParams>;
}

export default async (app: FastifyInstance): Promise<void> => {
  app.get<GetUserRequest>(
    "/:userId",
    {
      schema: {
        description: 'Get user by ID',
        tags: ['user'],
        summary: 'Finds the user or throws an error',
        params: GetUserParams,
        headers: AuthHeadersSchema,
        response: {
          200: UserResponseSchema,
          "4xx": ErrorResponseSchema,
        },
      },
    },
    async (request, response) => {
      const { userId } = request.params;
      const data = await container.get(GetUserUseCase).execute({ userId });
      response.status(200).send(data as UserResponseType);
    }
  );
}
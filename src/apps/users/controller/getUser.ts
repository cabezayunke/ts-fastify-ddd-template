import { FastifyInstance } from 'fastify';
import { FromSchema } from 'json-schema-to-ts';
import { AuthenticatedRequest } from 'shared/infrastructure/controller/AuthenticatedRequest';
import { AuthHeadersSchema } from 'shared/infrastructure/controller/AuthHeadersSchema';
import { ErrorResponseSchema } from 'shared/infrastructure/controller/ErrorResponseSchema';
import { GetUserUseCase } from '../../../contexts/users/application/GetUserByIdQueryHandler';
import { container } from '../container';
import { UserResponseSchema, UserResponseType } from './UserResponse';

export const GetUserParams = {
  type: 'object',
  properties: {
    userId: { type: 'string' }
  },
  required: ['userId']
} as const;

interface GetUserRequest extends AuthenticatedRequest {
  Params: FromSchema<typeof GetUserParams>;
}

export default async (app: FastifyInstance): Promise<void> => {
  app.get<GetUserRequest>(
    '/:userId',
    {
      schema: {
        description: 'Get user by ID',
        tags: ['user'],
        summary: 'Finds the user or throws an error',
        params: GetUserParams,
        headers: AuthHeadersSchema,
        response: {
          200: UserResponseSchema,
          '4xx': ErrorResponseSchema
        }
      }
    },
    async (request, response) => {
      const { userId } = request.params;
      const data = await container.get(GetUserUseCase).execute({ userId });
      response.status(200).send(data as UserResponseType);
    }
  );
};

import { FastifyReply, FastifyRequest } from 'fastify';
import { ApiError } from './ApiError';

const handleError = (error: Error | ApiError, _: FastifyRequest, reply: FastifyReply) => {
  if (error instanceof ApiError) {
    reply.statusCode = error.statusCode;
    reply.send({ message: error.message, extra: error.extra });
  } else {
    console.error(error);
    reply.statusCode = 500;
    reply.send({ message: 'Unexpected error' });
  }
};
export { handleError };

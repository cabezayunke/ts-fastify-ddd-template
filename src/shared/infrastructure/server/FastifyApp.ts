import fastifySwagger from '@fastify/swagger';
import fastify, { FastifyInstance, FastifyServerOptions } from 'fastify';
import { handleError } from './FastifyErrorHandler';

export interface FastifyAppParams extends FastifyServerOptions {
  swagger?: {
    enabled: boolean;
    tags?: [{ name: string; description: string }];
    host?: string;
  };
}

export const buildFastifyApp = (opts: FastifyAppParams = {}): FastifyInstance => {
  const { swagger, ...fastifyOpts } = opts;
  const app = fastify(fastifyOpts);

  if (swagger && swagger.enabled) {
    app.register(fastifySwagger, {
      routePrefix: '/docs',
      swagger: {
        info: {
          title: 'Fastify CRUD API',
          description: 'Testing the Fastify swagger API',
          version: '1.0.0'
        },
        host: swagger.host,
        schemes: ['http'],
        consumes: ['application/json'],
        produces: ['application/json'],
        tags: swagger.tags,
        definitions: {}
      },
      exposeRoute: true
    });
  }

  // error handling
  app.setErrorHandler(handleError);

  return app;
};

/**
 * Run the server!
 */
export const startFastifyApp = async (
  app: FastifyInstance,
  port: number,
  host: string
): Promise<string | undefined> => {
  try {
    // eslint-disable-next-line no-console
    console.log(`Server running on ${host}:${port}`, { tags: 'init,server' });
    const server = await app.listen({ port, host });
    return server;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err.message);
    process.exit(1);
  }
};

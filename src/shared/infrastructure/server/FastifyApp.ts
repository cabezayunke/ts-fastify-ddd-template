import fastify, { FastifyInstance, FastifyServerOptions } from "fastify";
import fastifySwagger from "@fastify/swagger";
import { handleError } from "./FastifyErrorHandler";

export interface AppParams extends FastifyServerOptions {
  swagger?: {
    enabled: boolean;
    tags?: [{ name: string, description: string}];
    host?: string;
  }  
}

export const buildApp = (opts: AppParams = {}): FastifyInstance => {
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
  app.setErrorHandler(handleError)

  return app;
};


/**
 * Run the server!
 */
 export const start = async (app: FastifyInstance, port: number, host: string) => {
    try {
        console.log(`Server running on ${host}:${port}`, { tags: 'init,server' });
        const server = await app.listen({ port, host })
        return server;
    } catch (err) {
        app.log.error(err)
        process.exit(1)
    }
}

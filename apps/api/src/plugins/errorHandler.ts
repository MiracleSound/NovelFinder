import { ZodError } from 'zod';

import type { FastifyInstance } from 'fastify';



export function registerErrorHandler(app: FastifyInstance) {
  app.setErrorHandler((err, _req, reply) => {
    const isValidationError = err instanceof ZodError;
    const status = isValidationError ? 400 : err.statusCode ?? 500;
    const message = isValidationError ? err.errors.map((e) => e.message).join('; ') : err.message;
    const code = status >= 500 ? 'SERVER_ERROR' : 'BAD_REQUEST';

    app.log.error({ err }, 'request error');

    // ensure Fastify logger reflects the status we send
    // eslint-disable-next-line no-param-reassign
    err.statusCode = status;

    return reply.status(status).send({
      error: {
        code,
        message: message || 'Unexpected error',
      },
    });
  });
}

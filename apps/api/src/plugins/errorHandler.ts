import type { FastifyInstance } from 'fastify';
import { ZodError } from 'zod';

export function registerErrorHandler(app: FastifyInstance) {
  app.setErrorHandler((err, _req, reply) => {
    const isValidationError = err instanceof ZodError;
    const status = err.statusCode ?? (isValidationError ? 400 : 500);
    const message = isValidationError ? err.errors.map((e) => e.message).join('; ') : err.message;
    const code = status >= 500 ? 'SERVER_ERROR' : 'BAD_REQUEST';

    app.log.error({ err }, 'request error');

    reply.status(status).send({
      error: {
        code,
        message: message || 'Unexpected error',
      },
    });
  });
}

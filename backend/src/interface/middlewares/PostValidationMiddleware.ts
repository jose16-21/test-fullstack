import { Request, Response, NextFunction } from 'express';
import { postQuerySchema, PostQueryParams } from '../../infrastructure/validation/postValidation';
import logger from '../../infrastructure/logger/logger';

export class validate {

  static getQuery(req: Request, res: Response, next: NextFunction): void {
    try {
      const { error, value } = postQuerySchema.validate(req.query, {
        abortEarly: false,      // Mostrar todos los errores, no solo el primero
        allowUnknown: false,    // No permitir parámetros desconocidos (genera error)
        stripUnknown: false,    // No eliminar parámetros desconocidos, generar error
        convert: true           // Convertir tipos automáticamente (string a number, etc.)
      });

      if (error) {
        const validationErrors = error.details.map(detail => ({
          field: detail.path.join('.'),
          message: detail.message,
          value: detail.context?.value,
          type: detail.type
        }));

        logger.warn('Validation failed for GET /posts query parameters', {
          errors: validationErrors,
          originalQuery: req.query,
          userAgent: req.get('User-Agent'),
          ip: req.ip
        });

        res.status(400).json({
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Los parámetros de consulta proporcionados no son válidos',
            details: validationErrors,
            timestamp: new Date().toISOString(),
            path: req.path,
            method: req.method
          }
        });
        return;
      }

      const validatedQuery = value as PostQueryParams;

      logger.debug('Query parameters validated successfully', {
        validatedQuery,
        originalQuery: req.query
      });

      req.query = validatedQuery as any;

      next();

    } catch (err) {
      logger.error('Unexpected error during query validation', {
        error: err instanceof Error ? err.message : 'Unknown error',
        stack: err instanceof Error ? err.stack : undefined,
        query: req.query
      });

      res.status(500).json({
        error: {
          code: 'INTERNAL_VALIDATION_ERROR',
          message: 'Error interno durante la validación de parámetros',
          timestamp: new Date().toISOString()
        }
      });
    }
  }
}
import { NextFunction, Request, Response } from 'express';

export class AppError extends Error {
  constructor(
    public readonly statusCode: number,
    message: string,
    public readonly details?: unknown
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export function notFoundHandler(_req: Request, res: Response): void {
  res.status(404).json({ code: 'NOT_FOUND', message: 'Ruta no encontrada' });
}

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction): void {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      code: 'APP_ERROR',
      message: err.message,
      details: err.details
    });
    return;
  }

  if (err && typeof err === 'object' && 'name' in err && err.name === 'ValidationError') {
    res.status(400).json({ code: 'VALIDATION_ERROR', message: 'Datos de reporte inválidos' });
    return;
  }

  if (err && typeof err === 'object' && 'name' in err && err.name === 'CastError') {
    res.status(400).json({ code: 'INVALID_ID', message: 'Identificador de reporte inválido' });
    return;
  }

  console.error('[error]', err);
  res.status(500).json({ code: 'INTERNAL_ERROR', message: 'Error interno del servidor' });
}

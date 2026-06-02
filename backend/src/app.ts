import cors from 'cors';
import express from 'express';
import reportRoutes from './routes/report.routes';
import { errorHandler, notFoundHandler } from './middlewares/error.middleware';
import { isDatabaseConnected } from './config/database';

export function createApp(frontendUrl: string): express.Application {
  const app = express();

  app.use(
    cors({
      origin: frontendUrl,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization']
    })
  );
  app.use(express.json({ limit: '1mb' }));

  app.get('/health', (_req, res) => {
    res.json({
      status: 'ok',
      database: isDatabaseConnected() ? 'connected' : 'disconnected',
      timestamp: new Date().toISOString()
    });
  });

  app.use('/api/reports', reportRoutes);
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}

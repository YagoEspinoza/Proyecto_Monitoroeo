import 'dotenv/config';
import { createApp } from './app';
import { connectDatabase } from './config/database';

const PORT = Number(process.env.PORT) || 3000;
const MONGODB_URI = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/my_monitoreo';
const FRONTEND_URL = process.env.FRONTEND_URL ?? 'http://localhost:4200';

async function bootstrap(): Promise<void> {
  await connectDatabase(MONGODB_URI);
  const app = createApp(FRONTEND_URL);
  app.listen(PORT, () => {
    console.log(`API de reportes escuchando en http://localhost:${PORT}`);
    console.log(`Health: http://localhost:${PORT}/health`);
  });
}

bootstrap().catch(error => {
  console.error('No se pudo iniciar el servidor:', error);
  process.exit(1);
});

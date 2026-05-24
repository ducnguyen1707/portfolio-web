import express from 'express';
import logger from './config/logger.js';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js';
import securityMiddleware from './middleware/security.middleware.js';

const app = express();
app.use(express.json());
app.use(helmet());
app.use(express.urlencoded({ extended: true }));

app.use(
  morgan('combined', {
    stream: { write: message => logger.info(message.trim()) },
  })
);
// Use Morgan with the "combined" format to log all HTTP requests,
// and redirect the log output into Winston by writing each message
// to logger.info after trimming extra whitespace.

app.use(securityMiddleware);

app.get('/', (req, res) => {
  logger.info('Welcome to DucNguyen Portfolio');
  res.status(200).send('Hi');
});

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 200,
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

app.get('/api', (req, res) => {
  res.status(200).json({ message: 'Api running 200' });
});

app.use('/api/auth', authRoutes); // /api/auth/sign-in
export default app;

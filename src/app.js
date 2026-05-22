import express from 'express';
import logger from './config/logger.js';
import helmet from 'helmet';

const app = express();

app.use(helmet())
app.get('/', (req, res) => {
  logger.info('Welcome to DucNguyen Portfolio');
  res.status(200).send('Hi');
});

export default app;

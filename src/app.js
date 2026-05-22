import express from 'express';
import logger from './config/logger.js';
import helmet from "helmet";
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';


const app = express();

app.use(helmet())
app.use(express.json());
app.use(express.urlencoded({extended: true }));

app.use(morgan('combined', {stream: {write: (message) => logger.info(message.trim())}})); 
// Use Morgan with the "combined" format to log all HTTP requests,
// and redirect the log output into Winston by writing each message
// to logger.info after trimming extra whitespace.

app.get('/', (req, res) => {
  logger.info('Welcome to DucNguyen Portfolio');
  res.status(200).send('Hi');
});

export default app;

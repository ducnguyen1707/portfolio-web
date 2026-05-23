import express from 'express';
import {signUp} from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/sign-in', (req, res) => {
  res.send('POST /api/auth/sign-in res');
});

router.post('/sign-up', signUp);

router.post('/sign-out', (req, res) => {
  res.send('POST /api/auth/sign-out res');
});

export default router;

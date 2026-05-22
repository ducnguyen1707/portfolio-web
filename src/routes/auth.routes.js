import express from 'express';

const router = express.Router();

router.post('/sign-in', (req, res) => {
    res.send('POST /api/auth/sign-in res')
});

router.post('/sign-up', (req, res) => {
    res.send('POST /api/auth/sign-up res')
});

router.post('/sign-out', (req, res) => {
    res.send('POST /api/auth/sign-out res')
});

export default router;
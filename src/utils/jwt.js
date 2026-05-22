import jwt from 'jsonwebtoken'
import logger from './config/logger.js'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'
const JWT_EXPIRES = '1d'

export const jwttoken = {
    sign: (payload) => {
        try {
            return jwt.sign(payload, JWT_SECRET, {expiresIn: JWT_EXPIRES});

        } catch(e) {
            logger.error('Fail to authenticate', e);
            throw new Error('Fail to authenticate');
        }
    },
    verify: (token) => {
        try{
            return jwt.verify(token, JWT_SECRET);
        }catch(e){
            logger.error('Fail to authenticate', e);
            throw new Error('Fail to authenticate', );
        }
    }
}
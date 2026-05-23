import logger from '../config/logger.js';
import brcypt from 'bcrypt';

export const hashPass = async (password) => {
    try{
        return await bcrypt.hash(password, 10);
    }catch(e){
        logger.error('Error when hashing', e);
        throw new Error('Error hashing');
    }
}
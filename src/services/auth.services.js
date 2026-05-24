import logger from '../config/logger.js';
import bcrypt from 'bcrypt';
import {eq} from 'drizzle-orm';
import db from '../config/db.js'
import {users} from '../models/user.model.js';

// This service handles user creation logic.
//
// Flow:
// 1. Check if a user with the given email already exists in the database.
//    - Email is treated as a unique identifier.
//    - If found → throw error to prevent duplicate accounts.
//
// 2. Hash the password using bcrypt before storing.
//    - Ensures security (never store plain text passwords).
//
// 3. Insert new user into the database with provided fields:
//    - name, email, hashed password, role
//    - optional fields: git_link, linked
//
// 4. Return only safe user data (exclude password).
//
// 5. Log success or error for debugging and monitoring.
//
// Notes:
// - This function currently assumes password is always provided.
//   If using social signup (git_link / linked only),
//   you should handle optional password before hashing.
// - Also, the existingUser query should use `await`,
//   otherwise it returns a Promise instead of actual data.

export const hashPass = async password => {
    try{
        return await bcrypt.hash(password, 10);
    }catch(e){
        logger.error('Error when hashing', e);
        throw new Error('Error hashing');
    }
}

export const createUser = async ({name, email, password, role = 'user' }) => {
    try{
        const existingUser = await db.select().from(users).where(eq(users.email, email)).limit(1);
        if(existingUser.length > 0) {
            throw new Error('User already exists');
        }
        
        const passwordHash = await hashPass(password);
        const [newUser] = await db.insert(users).values({name, email, password: passwordHash, role}).returning({id: users.id, name: users.name, email: users.email, role: users.role});
        logger.info(`User ${newUser.email} created successfully`);
        return newUser;

    }catch (e) {
        logger.error('Error when creating user', e);
        throw e;
    }
}
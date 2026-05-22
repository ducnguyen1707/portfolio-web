import 'dotenv/config';
import { neon } from '@neondatabse/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

const sql = neon(process.env.DB_URL);
const db = drizzle(sql);

export default db;

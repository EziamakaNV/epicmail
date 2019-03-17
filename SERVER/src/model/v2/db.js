import { Pool } from 'pg';

import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// Write query method to handle queries to database
const query = (text, params) => pool.query(text, params);

// Export the query
export default { query };

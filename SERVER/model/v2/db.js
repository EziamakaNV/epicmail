const { Pool } = require('pg');

const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// Write query method to handle queries to database
const query = (text, params) => pool.query(text, params);

// Export the query
module.exports = { query };

/* eslint-disable no-console */
import { Pool } from 'pg';

import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('connect', () => {
  console.log('connected to the db');
});

/**
 * Create Tables
 */

const createGroups = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
      groups(
        id PRIMARY KEY SERIAL,
        name TEXT NOT NULL,
        creatorId INT NOT NULL
      )`;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};


/**
 * Drop Tables
 */

const dropGroups = () => {
  const queryText = 'DROP TABLE IF EXISTS groups';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});

export default {
  createGroups,
  dropGroups,
};

// eslint-disable-next-line import/first
import 'make-runnable';

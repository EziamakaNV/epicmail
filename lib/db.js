"use strict";

/* eslint-disable no-console */
const _require = require('pg'),
      Pool = _require.Pool;

const dotenv = require('dotenv');

dotenv.config();
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
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
  console.log(process.env.DATABASE_URI);
  pool.query(queryText).then(res => {
    console.log(res);
    pool.end();
  }).catch(err => {
    console.log(err);
    pool.end();
  });
};

const createUsers = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
      users(
        id PRIMARY KEY SERIAL,
        email TEXT NOT NULL,
        firstName TEXT NOT NULL,
        lastName TEXT NOT NULL,
        password TEXT NOT NULL
      )`;
  pool.query(queryText).then(res => {
    console.log(res);
    pool.end();
  }).catch(err => {
    console.log(err);
    pool.end();
  });
};
/**
 * Drop Tables
 */


const dropGroups = () => {
  const queryText = 'DROP TABLE IF EXISTS groups';
  pool.query(queryText).then(res => {
    console.log(res);
    pool.end();
  }).catch(err => {
    console.log(err);
    pool.end();
  });
};

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});

const dropUsers = () => {
  const queryText = 'DROP TABLE IF EXISTS users';
  pool.query(queryText).then(res => {
    console.log(res);
    pool.end();
  }).catch(err => {
    console.log(err);
    pool.end();
  });
};

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});
module.exports = {
  createGroups,
  dropGroups,
  createUsers,
  dropUsers
}; // eslint-disable-next-line import/first

require('make-runnable');
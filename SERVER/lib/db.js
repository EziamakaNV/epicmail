"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _pg = require("pg");

var _dotenv = _interopRequireDefault(require("dotenv"));

require("make-runnable");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-console */
_dotenv.default.config();

const pool = new _pg.Pool({
  connectionString: process.env.DATABASE_URL
});
pool.on('connect', () => {
  console.log('connected to the db');
});
/**
 * Create Tables
 */

const createTables = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
      groups(
        id INT PRIMARY KEY,
        name TEXT NOT NULL,
        role TEXT NOT NULL,
        creatorId INT NOT NULL
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


const dropTables = () => {
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
var _default = {
  createTables,
  dropTables
}; // eslint-disable-next-line import/first

exports.default = _default;
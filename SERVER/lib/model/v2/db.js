"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _pg = require("pg");

var _dotenv = require("dotenv");

(0, _dotenv.config)();
const pool = new _pg.Pool({
  connectionString: process.env.DATABASE_URL
}); // Write query method to handle queries to database

const query = (text, params) => pool.query(text, params); // Export the query


var _default = {
  query
};
exports.default = _default;
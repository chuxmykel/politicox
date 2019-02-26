import dotenv from 'dotenv';
import { Pool } from 'pg';
import createTableQuery from './createTables';
import dropTableQuery from './dropTables';
import seed from './seed';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.NODE_ENV === 'test'
    ? process.env.TEST_DATABASE_URL : process.env.DATABASE_URL
});

pool.on('connect', () => {
  console.log('connected to the db');
});

/**
  * @method createTables
  * @description Creates all the required tables
  * @param {empty} none- Takes no parameters
  * @returns {promise} a promise
  */
const createTables = () => {
  pool.query(createTableQuery)
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
  * @method dropTables
  * @description Drops all created tables
  * @param {empty} none - Takes no parameters
  * @returns {promise} a promise
  */
const dropTables = () => {
  pool.query(dropTableQuery)
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
  * @method seedTables
  * @description Populates the created tables
  * @param {empty} none - Takes no parameters
  * @returns {promise} a promise
  */
const seedTables = () => {
  pool.query(seed)
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

module.exports = {
  createTables,
  dropTables,
  seedTables
};

require('make-runnable');

require('dotenv').config();

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME_TEST, DB_NAME_DEV } =
  process.env;

module.exports = {
  development: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME_DEV,
    host: DB_HOST,
    dialect: 'mysql'
  },
  test: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME_TEST,
    host: DB_HOST,
    dialect: 'mysql'
  },
  production: {
    username: 'root',
    password: null,
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'mysql'
  }
};

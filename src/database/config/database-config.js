require('dotenv').config();

const {
  CCCA_DB_USER,
  CCCA_DB_PASS,
  CCCA_DB_HOST,
  CCCA_DB_DEV_DB_NAME,
  CCCA_DB_TEST_DB_NAME
} = process.env;

module.exports = {
  development: {
    username: CCCA_DB_USER,
    password: CCCA_DB_PASS,
    database: CCCA_DB_DEV_DB_NAME,
    host: CCCA_DB_HOST,
    dialect: 'mysql'
  },
  test: {
    username: CCCA_DB_USER,
    password: CCCA_DB_PASS,
    database: CCCA_DB_TEST_DB_NAME,
    host: CCCA_DB_HOST,
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

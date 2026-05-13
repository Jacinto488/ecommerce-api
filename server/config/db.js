require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: 'localhost',
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
});

pool.connect()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch(err => console.error("Connection error", err));

module.exports = pool;

console.log("DB_PASSWORD:", process.env.DB_PASSWORD);
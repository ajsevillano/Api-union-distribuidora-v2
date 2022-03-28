import pg from 'pg';
import dbConfig from './dbConfig.js';

//Development DB configuration
const localConfigObject = {
  user: dbConfig.user,
  host: dbConfig.host,
  database: dbConfig.database,
  password: dbConfig.password,
  port: dbConfig.port,
  ssl: { rejectUnauthorized: false },
};

//Production DB configuration (Heroku host)
const productionConfigObject = {
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
};

export default function query(text, params) {
  const pool = new pg.Pool(
    process.env.PROJECT_ENV === 'dev'
      ? localConfigObject
      : productionConfigObject
  );
  const res = pool.query(text, params);
  pool.end();
  return res;
}

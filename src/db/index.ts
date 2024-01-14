import { Pool } from 'pg';

const pool = new Pool({
  max: 15,
  idleTimeoutMillis: 20000,
  connectionTimeoutMillis: 2000,
});

export const query = async (text: string, params: any, callback: any) => {
  const start = Date.now();
  const res = await pool.query(text, params, callback);
  const duration = Date.now() - start;
  console.log('executed query', { text, duration, rows: res.rowCount });
  return res;
};

import dotenv from "dotenv";
import pg from "pg";
dotenv.config();

const db = new pg.Client({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
});

db.connect();

export default db;
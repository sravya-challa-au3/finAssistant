import mysql from "mysql2";
import "dotenv/config";

export const pool = mysql.createPool({
  host: 'localhost',
  port: 3306,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PSW,
  database: 'finAssistant',
  waitForConnections: true,
  connectionLimit: 5,
  timezone: 'Z'
});
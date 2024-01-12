import { createPool } from "mysql2/promise";
import {DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER} from "../config.js"

export const pool = createPool({
  user: DB_USER,
  password: DB_PASSWORD,
  host: DB_HOST,
  port: DB_PORT,
  database: DB_NAME
})

// Example query to test the connection
async function testConnection() {
  try {
    const [result] = await pool.query('SELECT DATABASE() AS database_name');
    const [tablesResult] = await pool.query('SHOW TABLES');
    console.log('Database connection successful. Result:', result[0]);
    console.log('tables:', tablesResult[0]);
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
}

// Call the function to test the database connection
testConnection();
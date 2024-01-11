import { createPool } from "mysql2/promise";
import mysql from 'mysql2'
import {DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER} from "../config.js"

export const pool = mysql.createConnection({
  user: DB_USER,
  password: DB_PASSWORD,
  host: DB_HOST,
  port: DB_PORT,
  database: DB_NAME
})

pool.connect(function (err) {
    if (err) throw err;
  
    console.log('DB Connected.........');
  })
import express from 'express';
import cors from 'cors'
import { pool } from './db/db.js';

const app = express();

app.use(cors()); //any//origin frontend app can ask data

// routes
app.get('/', async (req,res)=> {
    [data] = await pool.query('SELECT 1+1 AS result;');
    res.send({
        data: data
    });
})

// connection
const port = 3000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`,` http://localhost:${port}/`);
})
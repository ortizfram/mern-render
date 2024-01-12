import express from 'express';
import cors from 'cors'
import { pool } from './db/db.js';
import { VITE_BACKEND_URL, FRONTEND_URL, PORT } from './config.js';

const app = express();

app.use(cors({
    origin: FRONTEND_URL
})); //any//origin frontend app can ask data

app.get('/', async (req,res)=> {
    const [result] = await pool.query(`SELECT 1+1`)
    res.send({
        result: result
    });
})


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`,` ${VITE_BACKEND_URL}/`);

})
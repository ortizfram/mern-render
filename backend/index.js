import express from 'express';
import cors from 'cors'
import { pool } from './db/db.js';
import { VITE_BACKEND_URL, VITE_FRONTEND_URL, PORT } from './config.js';

const app = express();

// Use cors middleware to handle CORS headers
// Access-Control-Allow-Origin
app.use(cors({
    origin: VITE_FRONTEND_URL,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  }));
  

app.get('/', async (req,res)=> {
    const [result] = await pool.query(`SELECT username FROM users`);
    res.send({
        message: 'hello from backend',
        result: result
    });
})


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`,` ${VITE_BACKEND_URL}/`);

})
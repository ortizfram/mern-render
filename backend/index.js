import express from 'express';
import cors from 'cors'
import { pool } from './db/db.js';
import { VITE_BACKEND_URL, VITE_FRONTEND_URL, PORT } from './config.js';

const app = express();

// Use cors middleware to handle CORS headers
// Access-Control-Allow-Origin
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    // other headers...
    next();
  });
  

app.get('/', async (req,res)=> {
    const [result] = await pool.query(`SELECT 1+1 as result`);
    res.send({
        message: 'hello from backend',
        result: result
    });
})


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`,` ${VITE_BACKEND_URL}/`);

})
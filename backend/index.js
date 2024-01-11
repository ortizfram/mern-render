import express from 'express';
import cors from 'cors'

const app = express();

app.use(cors({
    origin: 'http://127.0.0.1:5173'
})); //any//origin frontend app can ask data

app.get('/', (req,res)=> {
    res.send({
        users: ['alfred', 'monica', 'tukushimi']
    });
})

const port = 3000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`,` http://localhost:${port}/`);
})
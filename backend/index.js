import express from 'express';
import cors from 'cors'
import { pool } from './db/db.js';
import { VITE_BACKEND_URL, VITE_FRONTEND_URL, PORT } from './config.js';
import fileUpload from "express-fileupload";
import methodOverride from "method-override";
import path from "path";
import { fileURLToPath } from "url";
import expressEjsLayouts from 'express-ejs-layouts';

// connection
const app = express();
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`,` ${VITE_BACKEND_URL}/`);
})

// Use cors middleware to handle CORS headers
// Access-Control-Allow-Origin
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     // other headers...
//     next();
//   });

// Use cors middleware to handle CORS headers
app.use(
  cors({
    origin: true, // Specify the exact origin of your frontend
    credentials: true, // Enable credentials (cookies, HTTP authentication)
  })
);

// configure methodOverride
app.use(methodOverride('_method'));

// Set default time zone
Intl.DateTimeFormat = Intl.DateTimeFormat(undefined, { timeZone: 'America/Argentina/Buenos_Aires' });

// shortcuts for files/dirs
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

//default option
app.use(fileUpload());

//Set up serving static files in Express:
app.use(express.static(path.join(__dirname, "src","public")));
app.use("/uploads", express.static(path.join(__dirname, "src","uploads")));

// config templates and EJS
app.use(expressEjsLayouts);
app.set("layout", "../layouts/layout.ejs");
app.set("view engine", "ejs");
app.set("views", [path.join(__dirname, "src","views", "templates")]);


  

app.get('/', async (req,res)=> {
    const [result] = await pool.query(`SELECT 1+1 as result`);
    res.send({
        message: 'hello from backend',
        result: result
    });
})


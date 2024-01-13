import express from 'express';
import session from "express-session";
import cors from 'cors'
import { pool } from './db/db.js';
import { VITE_BACKEND_URL, VITE_FRONTEND_URL, PORT } from './config.js';
import fileUpload from "express-fileupload";
import methodOverride from "method-override";
import path from "path";
import { fileURLToPath } from "url";
import expressEjsLayouts from 'express-ejs-layouts';
import morgan from "morgan";
import authRoutes from "./src/routes/auth.routes.js";
import blogRoutes from "./src/routes/blog.routes.js";
import adminRoutes from "./src/routes/admin.routes.js";
import paymentRoutes from "./src/routes/payment.routes.js";
import employeeRoutes from "./src/routes/employee.routes.js";
import coursesRoutes from "./src/routes/courses.routes.js";
import indexRoutes from "./src/routes/index.routes.js";

// connection
const app = express();
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`,` ${VITE_BACKEND_URL}/`);
})

// Use cors middleware to handle CORS headers
//Access-Control-Allow-Origin
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', VITE_FRONTEND_URL); // *
//     // other headers...
//     next();
//   });

// Use cors middleware to handle CORS headers
app.use(
  cors({
    origin: VITE_FRONTEND_URL, // Specify the exact origin of your frontend
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

// db use JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use morgan to see requests in console
app.use(morgan('dev'));
  
// Use sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET, // Change this to a secure secret key
    resave: false,
    saveUninitialized: true,
  })
);

// Define a function to set MIME types based on file extensions
export const setCustomMimeTypes = (req, res, next) => {
  const extension = req.path.split('.').pop();
  let contentType = '';

  switch (extension) {
    case 'mp4':
    case 'm4v':
    case 'f4v':
    case 'f4p':
      contentType = 'video/mp4';
      break;
    case 'ogv':
      contentType = 'video/ogg';
      break;
    case 'webm':
      contentType = 'video/webm';
      break;
    case 'flv':
      contentType = 'video/x-flv';
      break;
    default:
      contentType = 'application/octet-stream'; // Default MIME type for unknown files
  }

  res.set('Content-Type', contentType);
  next();
};

// Middleware to set MIME types for videos
app.use('/uploads/videos', setCustomMimeTypes, express.static(path.join(__dirname, 'uploads/videos')));
// Use routes app
app.use(indexRoutes);
app.use("/api", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api", paymentRoutes);
app.use("/api", coursesRoutes);
app.use("/api", employeeRoutes);
app.use("/api", blogRoutes);

// MIDDLEWARE
// =============================================================
// middleware for 404
app.use((req, res) => {
  res.status(404).json({
    message: "endpoint Not Found",
  });
});



// middleware for admin&staff
export function admin_staff_check (req, res, next) {
  const user = req.session.user || null;
  if(!user || (user.role !== 'staff' && user.role !== 'admin')){
    return res.status(403).send(`Forbidden`);
  }
  next();
}

// Middleware for checking course enrollment
export async function checkCourseEnrollment(req, res, next) {
  console.log("\n\n*** middleware: checkCourseEnrollment\n\n");
  const courseId = req.params.id;
  console.log("\n\ncourseId: ",courseId);
  const user = req.session.user || null;

  try {
    if (!user) {
      return res.status(403).redirect('/api/login');
    }
//
    const [enrolledRows] = await pool.query(getUserEnrolledCoursesQuery, [user.id]);
    console.log("\n\nenrolledRows: ", enrolledRows);

    // Extracting course IDs from the fetched data (assuming the ID field is 'course_id')
    const enrolledCourses = enrolledRows.map(row => row.id);

    if (enrolledCourses.includes(parseInt(courseId))) {
      // User is enrolled in the course, proceed to render the courseDetail
      return next();
    } else {
      // You are not enrolled in this course
      // Redirect the user to the course overview URL
      return res.redirect(`/api/course/${courseId}/enroll`);
    }
  } catch (error) {
    console.error("Error checking user enrollment:", error);
    return res.status(500).send("Error checking user enrollment");
  }
}

// middleware for admin&staff clinking a course
export async function admin_staff_clicking_course (req, res, next) {
  const user = req.session.user || null;
  if(!user || (user.role !== 'staff' && user.role !== 'admin')){
    // if not staff/admin, send to course enrollment middleware
    await checkCourseEnrollment(req, res, next);
  }

  // if staff/admin render course detail without passing through enrollment middleware
  next();
}

// middleware for login user
export function is_loggedin_check (req, res, next) {
  const user = req.session.user || null;
  if(!user) {
    // Redirect the user to the login page
    return res.status(403).redirect('/api/login');
  }
  next();
}


export default app;

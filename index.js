import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/connectDB.js";
import { DB_NAME } from "./constants.js";
import userRouter from "./src/routes/user.routes.js";
import academicRoute from "./src/routes/academics.routes.js";
import homeRouter from "./src/routes/home.routes.js";
import eventsRouter from "./src/routes/events.routes.js";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import admissionRouter from "./src/routes/admission.routes.js";

dotenv.config({
  path: "./.env"
});

const app = express();

const PORT = process.env.PORT || 8080;

// --- Database Connection ---
connectDB(`${process.env.MONGODB_URI}${DB_NAME}`);

// --- Middlewares ---
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Use extended: true as a good practice
app.use(cookieParser());

// --- API Routes ---
// These should come BEFORE the frontend serving logic
app.use('/api/user', userRouter);
app.use('/api/academic', academicRoute);
app.use('/api/home', homeRouter);
app.use('/api/events', eventsRouter);
app.use('/api/admission', admissionRouter);

// --- Static Frontend Serving ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// This line serves the built React app from the 'dist' directory
app.use(express.static(path.join(__dirname, "myapp06", "dist")));

// This is the fallback for SPA routing. Any request that doesn't match an API route
// will be sent the index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "myapp06", "dist", "index.html"));
});


// --- Server Listener ---
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
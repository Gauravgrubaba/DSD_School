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

dotenv.config({
    path: "./.env"
});

const app = express();

const PORT = process.env.PORT || 8000;

connectDB(`${process.env.MONGODB_URI}${DB_NAME}`);

app.use(express.json());
app.use(express.urlencoded());
app.use('/api/user', userRouter);
app.use('/api/academic', academicRoute);
app.use('/api/home', homeRouter);
app.use('/api/events', eventsRouter);

// Required for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from Vite build
app.use(express.static(path.join(__dirname, "myapp06", "dist")));

// Fallback to index.html for SPA routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "myapp06", "dist", "index.html"));
});

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
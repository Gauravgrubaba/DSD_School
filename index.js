import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/connectDB.js";
import { DB_NAME } from "./constants.js";
import userRouter from "./src/routes/user.routes.js";
import academicRoute from "./src/routes/academics.routes.js";
import homeRouter from "./src/routes/home.routes.js";
import eventsRouter from "./src/routes/events.routes.js"

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

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
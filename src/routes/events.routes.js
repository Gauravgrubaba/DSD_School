import express from "express";
import { handleAddEvent, handleDeleteEvent, handleGetAllEvents } from "../controllers/events.controllers.js";
import upload from "../middlewares/multer.middlewares.js";

const router = express.Router();

//Events
router.post('/event', upload.single("event-image"), handleAddEvent);
router.get('/event', handleGetAllEvents);
router.delete('/event/:idx', handleDeleteEvent);

export default router;
import express from "express";
import { handleAddEvent, handleAddUpdateTagline, handleDeleteEvent, handleGetAllEvents, handleGetTagline } from "../controllers/events.controllers.js";
import upload from "../middlewares/multer.middlewares.js";

const router = express.Router();

//Events
router.post('/event', upload.single("event-image"), handleAddEvent);
router.get('/event', handleGetAllEvents);
router.delete('/event/:idx', handleDeleteEvent);

//tagline
router.post('/tagline', handleAddUpdateTagline);
router.get('/tagline', handleGetTagline);

export default router;
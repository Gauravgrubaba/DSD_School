import express from "express";
import { handleAddEvent, handleAddUpdateTagline, handleDeleteEvent, handleGetAllEvents, handleGetTagline } from "../controllers/events.controllers.js";
import upload from "../middlewares/multer.middlewares.js";
import verifyJWT from "../middlewares/verifyJWT.middleware.js"

const router = express.Router();

router.get('/event', handleGetAllEvents);
router.get('/tagline', handleGetTagline);

router.use(verifyJWT);

//Events
router.post('/event', upload.single("event-image"), handleAddEvent);
router.delete('/event/:idx', handleDeleteEvent);

//tagline
router.post('/tagline', handleAddUpdateTagline);

export default router;
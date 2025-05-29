import express from "express";
import { handleAddRoutine, handleCreateClass, handleGetAllTimeTable } from "../controllers/academics.controllers.js";

const router = express.Router();

router.post('/class', handleCreateClass);
router.patch('/class/:id', handleAddRoutine);
router.get('/class', handleGetAllTimeTable);

export default router;
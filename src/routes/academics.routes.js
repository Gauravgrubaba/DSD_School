import express from "express";
import { handleAddRoutine, handleCreateClass, handleDeleteClass, handleGetAllTimeTable } from "../controllers/academics.controllers.js";

const router = express.Router();

router.post('/class', handleCreateClass);
router.patch('/class/:id', handleAddRoutine);
router.get('/class', handleGetAllTimeTable);
router.delete('/class/:id', handleDeleteClass);

export default router;
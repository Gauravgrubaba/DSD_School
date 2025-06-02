import express from "express";
import { handleAddRoutine, handleCreateClass, handleDeleteClass, handleDeleteTimeTable, handleGetAllTimeTable } from "../controllers/academics.controllers.js";

const router = express.Router();

router.post('/class', handleCreateClass);
router.patch('/class/:id', handleAddRoutine);
router.get('/class', handleGetAllTimeTable);
router.delete('/class/:id', handleDeleteClass);
router.delete('/class/:id/:day/:idx', handleDeleteTimeTable)

export default router;
import express from "express";
import { dummy } from "../controllers/admission.controller.js";

const router = express.Router();

router.post('/abc', dummy)

export default router;
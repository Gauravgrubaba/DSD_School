import express from "express";
import { handleUserlogin } from "../controllers/user.controllers.js";

const router = express.Router();

router.post('/login', handleUserlogin);

export default router;
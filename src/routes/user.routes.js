import express from "express";
import { handleAboutUsUpdate, handleAddTeacher, handleEditTeacher, handleGetAboutUs, handleGetAllTeachers, handleUserlogin } from "../controllers/user.controllers.js";
import upload from "../middlewares/multer.middlewares.js";

const router = express.Router();

router.post('/login', handleUserlogin);
router.patch('/about', handleAboutUsUpdate);
router.get('/about', handleGetAboutUs);
router.post('/teachers', upload.single("profileImage"), handleAddTeacher);
router.get('/teachers', handleGetAllTeachers);
router.patch('/teachers', handleEditTeacher);

// router.post('/upload', upload.single("profileImage"), handleProfilePictureUpload);

export default router;
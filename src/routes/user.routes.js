import express from "express";
import { handleAboutUsUpdate, handleAddTeacher, handleDeleteTeacher, handleEditTeacher, handleGetAboutUs, handleGetAllTeachers, handleUserlogin } from "../controllers/user.controllers.js";
import upload from "../middlewares/multer.middlewares.js";

const router = express.Router();

router.post('/login', handleUserlogin);
router.patch('/about', handleAboutUsUpdate);
router.get('/about', handleGetAboutUs);
router.post('/teachers', upload.single("profileImage"), handleAddTeacher);
router.get('/teachers', handleGetAllTeachers);
router.patch('/teachers/:id', upload.single("profileImage"), handleEditTeacher);
router.delete('/teachers/:id', handleDeleteTeacher);

// router.post('/upload', upload.single("profileImage"), handleProfilePictureUpload);

export default router;
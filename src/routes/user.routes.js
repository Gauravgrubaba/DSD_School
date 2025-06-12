import express from "express";
import { 
    handleGetMapAddress,
    handleAboutUsUpdate, 
    handleAddTeacher, 
    handleDeleteTeacher, 
    handleEditTeacher, 
    handleGetAboutUs, 
    handleGetAddress, 
    handleGetAllTeachers, 
    handleUpdateAddress, 
    handleUserlogin, 
    handleUpdateMapAddress,
    handleContactUsMessage,
    handleGetAllMessage,
    handleUpdateMessageStatus,
    handleDeleteMessage
} from "../controllers/user.controllers.js";
import upload from "../middlewares/multer.middlewares.js";

const router = express.Router();

router.post('/login', handleUserlogin);
router.patch('/about', upload.single("aboutUsImage"), handleAboutUsUpdate);
router.get('/about', handleGetAboutUs);
router.post('/teachers', upload.single("profileImage"), handleAddTeacher);
router.get('/teachers', handleGetAllTeachers);
router.patch('/teachers/:id', upload.single("profileImage"), handleEditTeacher);
router.delete('/teachers/:id', handleDeleteTeacher);

router.patch('/address', handleUpdateAddress);
router.get('/address', handleGetAddress);
router.patch('/mapaddress', handleUpdateMapAddress);
router.get('/mapaddress', handleGetMapAddress);

router.post('/message', handleContactUsMessage);
router.get('/message', handleGetAllMessage);
router.patch('/message/:id', handleUpdateMessageStatus);
router.delete('/message/:id', handleDeleteMessage);

export default router;
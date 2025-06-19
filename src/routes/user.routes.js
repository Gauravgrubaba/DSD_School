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
    handleDeleteMessage,
    handleLogout,
    handleRefreshToken
} from "../controllers/user.controllers.js";
import upload from "../middlewares/multer.middlewares.js";
import verifyJWT from "../middlewares/verifyJWT.middleware.js";

const router = express.Router();

router.get('/address', handleGetAddress);
router.get('/about', handleGetAboutUs);
router.get('/teachers', handleGetAllTeachers);
router.get('/mapaddress', handleGetMapAddress);

router.post('/message', handleContactUsMessage);

router.post('/login', handleUserlogin);
router.post('/refresh-token', handleRefreshToken);

router.use(verifyJWT);

router.post('/logout', handleLogout);

router.patch('/about', upload.single("aboutUsImage"), handleAboutUsUpdate);
router.post('/teachers', upload.single("profileImage"), handleAddTeacher);
router.patch('/teachers/:id', upload.single("profileImage"), handleEditTeacher);
router.delete('/teachers/:id', handleDeleteTeacher);

router.patch('/address', handleUpdateAddress);
router.patch('/mapaddress', handleUpdateMapAddress);
router.get('/message', handleGetAllMessage);
router.patch('/message/:id', handleUpdateMessageStatus);
router.delete('/message/:id', handleDeleteMessage);

export default router;
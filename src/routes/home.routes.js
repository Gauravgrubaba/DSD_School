import express from "express";
import { 
    handleAddNotice,
    handleDeleteNotice,
    handleGetHomeHeroSection,
    handleGetNotices,
    handleHeroSection,
    handleUpdateNotice
} from "../controllers/home.controllers.js";
import upload from "../middlewares/multer.middlewares.js";

const router = express.Router();

router.post('/herosection', upload.single("homeHeroImage"), handleHeroSection);
router.get('/herosection', handleGetHomeHeroSection);

//Notices
router.post('/notice', handleAddNotice);
router.get('/notice', handleGetNotices);
router.patch('/notice/:idx', handleUpdateNotice);
router.delete('/notice/:idx', handleDeleteNotice);

export default router;
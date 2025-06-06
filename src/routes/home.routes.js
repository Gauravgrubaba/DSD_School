import express from "express";
import { 
    handleAddNewAchievement,
    handleAddNotice,
    handleDeleteAchievement,
    handleDeleteNotice,
    handleGetAllAchievements,
    handleGetHomeHeroSection,
    handleGetNotices,
    handleHeroSection,
    handleUpdateAchievement,
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

//Achievements
router.post('/achievement', handleAddNewAchievement);
router.get('/achievement', handleGetAllAchievements);
router.patch('/achievement/:idx', handleUpdateAchievement);
router.delete('/achievement/:idx', handleDeleteAchievement);

export default router;
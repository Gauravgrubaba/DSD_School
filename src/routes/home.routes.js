import express from "express";
import { 
    handleAddNewAchievement,
    handleAddNews,
    handleAddNotice,
    handleDeleteAchievement,
    handleDeleteNews,
    handleDeleteNotice,
    handleGetAllAchievements,
    handleGetAllNews,
    handleGetHomeHeroSection,
    handleGetNotices,
    handleHeroSection,
    handleUpdateAchievement,
    handleUpdateNews,
    handleUpdateNotice
} from "../controllers/home.controllers.js";
import upload from "../middlewares/multer.middlewares.js";

const router = express.Router();

//Hero-section
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

//News
router.post('/news', handleAddNews);
router.get('/news', handleGetAllNews);
router.patch('/news/:idx', handleUpdateNews);
router.delete('/news/:idx', handleDeleteNews);

export default router;
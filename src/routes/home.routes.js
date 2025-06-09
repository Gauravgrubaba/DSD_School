import express from "express";
import { 
    handleAddNewAchievement,
    handleAddNewQuotation,
    handleAddNews,
    handleAddNotice,
    handleDeleteAchievement,
    handleDeleteNews,
    handleDeleteNotice,
    handleDeleteQuotation,
    handleGetAllAchievements,
    handleGetAllNews,
    handleGetAllQuotation,
    handleGetHomeHeroSection,
    handleGetNotices,
    handleHeroSection,
    handleUpdateAchievement,
    handleUpdateNews,
    handleUpdateNotice,
    handleUpdateQuotation
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

//Quotation
router.post('/quote', handleAddNewQuotation);
router.get('/quote', handleGetAllQuotation);
router.patch('/quote/:idx', handleUpdateQuotation);
router.delete('/quote/:idx', handleDeleteQuotation);

export default router;
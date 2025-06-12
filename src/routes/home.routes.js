import express from "express";
import { 
    handleAddAboutUs,
    handleAddManagement,
    handleAddNewAchievement,
    handleAddNewQuotation,
    handleAddNews,
    handleAddNotice,
    handleDeleteAchievement,
    handleDeleteManagement,
    handleDeleteNews,
    handleDeleteNotice,
    handleDeleteQuotation,
    handleGetAboutUs,
    handleGetAllAchievements,
    handleGetAllManagement,
    handleGetAllNews,
    handleGetAllQuotation,
    handleGetHomeHeroSection,
    handleGetNotices,
    handleHeroSection,
    handleUpdateAchievement,
    handleUpdateManagement,
    handleUpdateNews,
    handleUpdateNotice,
    handleUpdateQuotation
} from "../controllers/home.controllers.js";
import upload from "../middlewares/multer.middlewares.js";

const router = express.Router();

//Hero-section
router.post('/herosection', upload.single("homeHeroImage"), handleHeroSection);
router.get('/herosection', handleGetHomeHeroSection);

//About
router.post('/about', upload.single("aboutVideo"), handleAddAboutUs);
router.get('/about', handleGetAboutUs);

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

//Management
router.post('/management', upload.single("managementImage"), handleAddManagement);
router.get('/management', handleGetAllManagement);
router.patch('/management/:id', upload.single("managementImage"), handleUpdateManagement);
router.delete('/management/:id', handleDeleteManagement);

export default router;
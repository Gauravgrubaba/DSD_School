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
import verifyJWT from "../middlewares/verifyJWT.middleware.js";

const router = express.Router();

router.get('/herosection', handleGetHomeHeroSection);
router.get('/about', handleGetAboutUs);
router.get('/notice', handleGetNotices);
router.get('/achievement', handleGetAllAchievements);
router.get('/news', handleGetAllNews);
router.get('/quote', handleGetAllQuotation);
router.get('/management', handleGetAllManagement);

router.use(verifyJWT);

//Hero-section
router.post('/herosection', upload.single("homeHeroImage"), handleHeroSection);

//About
router.post('/about', upload.single("aboutVideo"), handleAddAboutUs);

//Notices
router.post('/notice', handleAddNotice);
router.patch('/notice/:idx', handleUpdateNotice);
router.delete('/notice/:idx', handleDeleteNotice);

//Achievements
router.post('/achievement', handleAddNewAchievement);
router.patch('/achievement/:idx', handleUpdateAchievement);
router.delete('/achievement/:idx', handleDeleteAchievement);

//News
router.post('/news', handleAddNews);
router.patch('/news/:idx', handleUpdateNews);
router.delete('/news/:idx', handleDeleteNews);

//Quotation
router.post('/quote', handleAddNewQuotation);
router.patch('/quote/:idx', handleUpdateQuotation);
router.delete('/quote/:idx', handleDeleteQuotation);

//Management
router.post('/management', upload.single("managementImage"), handleAddManagement);
router.patch('/management/:id', upload.single("managementImage"), handleUpdateManagement);
router.delete('/management/:id', handleDeleteManagement);

export default router;
import express from "express";
import { 
    handleAddRoutine, 
    handleCreateClass, 
    handleDeleteClass, 
    handleDeleteTimeTable, 
    handleGetAllTimeTable,
    handleAddHeroSection,
    handleGetHeroSection,
    handleDeleteHeroSectionImage
} from "../controllers/academics.controllers.js";
import upload from "../middlewares/multer.middlewares.js";

const router = express.Router();

router.post('/class', handleCreateClass);
router.patch('/class/:id', handleAddRoutine);
router.get('/class', handleGetAllTimeTable);
router.delete('/class/:id', handleDeleteClass);
router.delete('/class/:id/:day/:idx', handleDeleteTimeTable);

router.post('/herosection', upload.single("heroSectionImage"), handleAddHeroSection);
router.get('/herosection', handleGetHeroSection);
router.delete('/herosection/:index', handleDeleteHeroSectionImage);

export default router;
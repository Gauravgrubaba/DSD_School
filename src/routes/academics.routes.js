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
import verifyJWT from "../middlewares/verifyJWT.middleware.js";

const router = express.Router();

router.get('/class', handleGetAllTimeTable);
router.get('/herosection', handleGetHeroSection);

router.use(verifyJWT);

router.post('/class', handleCreateClass);
router.patch('/class/:id', handleAddRoutine);
router.delete('/class/:id', handleDeleteClass);
router.delete('/class/:id/:day/:idx', handleDeleteTimeTable);

router.post('/herosection', upload.single("heroSectionImage"), handleAddHeroSection);
router.delete('/herosection/:index', handleDeleteHeroSectionImage);

export default router;
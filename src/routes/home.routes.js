import express from "express";
import { 
    handleGetHomeHeroSection,
    handleHeroSection
} from "../controllers/home.controllers.js";
import upload from "../middlewares/multer.middlewares.js";

const router = express.Router();

router.post('/herosection', upload.single("homeHeroImage"), handleHeroSection);
router.get('/herosection', handleGetHomeHeroSection);

export default router;
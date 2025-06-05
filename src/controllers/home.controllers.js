import SchoolSchema from "../models/school.models.js";
import { v2 as cloudinary } from "cloudinary";
import uploadOnCloudinary from "../utils/cloudinary.js";

const handleHeroSection = async (req, res) => {
    const { subtitle, title } = req.body;
    const file = req.file;

    try {
        let imgUrl = "";

        const schoolData = await SchoolSchema.findOne({ schoolName: "DSD" });

        if(!schoolData) {
            return res.status(400).json({
                response: "error",
                message: "School does not exist"
            })
        }

        const images = schoolData.homeHeroSection?.heroImage;

        if(file && images) {
            const segment = images.split('/');
            const fileNameWithExtension = segment[segment.length - 1];
            const publicId = fileNameWithExtension.split('.')[0];
            const result = await cloudinary.uploader.destroy(publicId, { invalidate: true });
            console.log("Deleted image: ", result);
        }

        if(file) {
            const uploadResult = await uploadOnCloudinary(file.path);
            imgUrl = uploadResult.secure_url || "";
            schoolData.homeHeroSection.heroImage = imgUrl;
        }

        if(subtitle) {
            schoolData.homeHeroSection.heroSubtitle = subtitle;
        }

        if(title) {
            schoolData.homeHeroSection.heroTitle = title;
        }

        const result = await schoolData.save();

        const dataToSend = {
            image: result.homeHeroSection?.heroImage,
            title: result.homeHeroSection?.heroTitle,
            subtitle: result.homeHeroSection?.heroSubtitle
        }

        return res.status(200).json({
            response: "success",
            result: dataToSend
        })
    } catch (error) {
        return res.status(500).json({
            response: "error",
            message: "Something went wrong while updating hero section"
        })
    }
}

const handleGetHomeHeroSection = async (req, res) => {
    try {
        const schoolData = await SchoolSchema.findOne({ schoolName: "DSD" });
        
        const dataToSend = {
            image: schoolData.homeHeroSection?.heroImage,
            title: schoolData.homeHeroSection?.heroTitle,
            subtitle: schoolData.homeHeroSection?.heroSubtitle
        }

        return res.status(200).json({
            response: "success",
            result: dataToSend
        })
    } catch (error) {
        return res.status(500).json({
            response: "error",
            message: "Something went wrong while fetching hero section"
        })
    }
}

export {
    handleHeroSection,
    handleGetHomeHeroSection
}
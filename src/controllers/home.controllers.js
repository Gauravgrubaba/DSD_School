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

const handleAddNotice = async (req, res) => {
    const { notice } = req.body;
    
    try {
        const schoolData = await SchoolSchema.findOne({ schoolName: "DSD" });

        if(!schoolData) {
            return res.status(404).json({
                response: "error",
                message: "School not found"
            })
        }

        schoolData.notice.push(notice);
        await schoolData.save();

        const updatedSchoolData = await SchoolSchema.findOne({ schoolName: "DSD" });
        const allNotices = updatedSchoolData.notice

        return res.status(200).json({
            response: "success",
            result: allNotices
        })
    } catch (error) {
        return res.status(500).json({
            response: "error",
            message: "Unable to add notice"
        })
    }
}

const handleUpdateNotice = async (req, res) => {
    const { idx } = req.params;
    const { notice } = req.body;

    try {
        const schoolData = await SchoolSchema.findOne({ schoolName: "DSD" });

        if(!schoolData) {
            return res.status(404).json({
                response: "error",
                message: "School not exist"
            })
        }

        const index = parseInt(idx);
        if(isNaN(index) || index < 0 || index >= schoolData.notice.length) {
            return res.status(404).json({
                response: "error",
                message: "Invalid Index"
            })
        }
        
        schoolData.notice[index] = notice;
        await schoolData.save();

        const updatedSchoolData = await SchoolSchema.findOne({ schoolName: "DSD" });
        const allNotices = updatedSchoolData.notice;

        console.log(allNotices);

        return res.status(200).json({
            response: "success",
            result: allNotices
        })
    } catch (error) {
        return res.status(500).json({
            response: "error",
            message: "Error updating notice"
        })
    }
}

const handleGetNotices = async (req, res) => {
    try {
        const schoolData = await SchoolSchema.findOne({ schoolName: "DSD" });
        const allNotices = schoolData.notice;

        return res.status(200).json({
            response: "success",
            result: allNotices
        })
    } catch (error) {
        return res.status(500).json({
            response: "error",
            message: "Error fetching all notices"
        })
    }
}

const handleDeleteNotice = async (req, res) => {
    const { idx } = req.params;
    
    try {
        const schoolData = await SchoolSchema.findOne({ schoolName: "DSD" });

        if(!schoolData) {
            return res.status(404).json({
                response: "error",
                message: "School not found"
            })
        }

        const index = parseInt(idx);
        if(isNaN(index) || index < 0 || index >= schoolData.notice.length) {
            return res.status(404).json({
                response: "error",
                message: "Invalid index"
            })
        }

        schoolData.notice.splice(index, 1);
        await schoolData.save();

        const updatedSchoolData = await SchoolSchema.findOne({ schoolName: "DSD" });
        const allNotices = updatedSchoolData.notice;

        return res.status(200).json({
            response: "success",
            message: "Notice deleted",
            result: allNotices
        })
    } catch (error) {
        return res.status(500).json({
            response: "error",
            message: "Something went wrong while deleting notice"
        })
    }
}

const handleAddNewAchievement = async (req, res) => {
    const { achievement } = req.body;

    if(!achievement) {
        return res.status(404).json({
            response: "error",
            message: "Empty field! Type something to add in achievement"
        })
    }
    
    try {
        const schoolData = await SchoolSchema.findOne({ schoolName: "DSD" });

        if(!schoolData) {
            return res.status(404).json({
                response: "error",
                message: "School not found"
            })
        }

        schoolData.achievement.push(achievement);
        await schoolData.save();

        const updatedSchoolData = await SchoolSchema.findOne({ schoolName: "DSD" });
        const allAchievements = updatedSchoolData.achievement;

        return res.status(200).json({
            response: "success",
            result: allAchievements
        })
    } catch (error) {
        return res.status(500).json({
            response: "error",
            message: "Something went wrong while adding achievement"
        })
    }
}

const handleGetAllAchievements = async (req, res) => {
    try {
        const schoolData = await SchoolSchema.findOne({ schoolName: "DSD" });

        if(!schoolData) {
            return res.status(404).json({
                response: "error",
                message: "School not found"
            })
        }
        
        const allAchievements = schoolData.achievement;

        return res.status(200).json({
            response: "success",
            result: allAchievements
        })
    } catch (error) {
        return res.status(500).json({
            response: "error",
            message: "Error fetching all achievements"
        })
    }
}

const handleUpdateAchievement = async (req, res) => {
    const { idx } = req.params;
    const { achievement } = req.body;

    if(!achievement) {
        return res.status(404).json({
            response: "error",
            message: "Achievement field cannot be empty!"
        })
    }

    try {
        const schoolData = await SchoolSchema.findOne({ schoolName: "DSD" });

        if(!schoolData) {
            return res.status(404).json({
                response: "error",
                message: "School not found"
            })
        }

        const index = parseInt(idx);
        if(isNaN(index) || index < 0 || index >= schoolData.achievement.length) {
            return res.status(404).json({
                response: "error",
                message: "Invalid Index"
            })
        }

        schoolData.achievement[index] = achievement;
        await schoolData.save();

        const updatedSchoolData = await SchoolSchema.findOne({ schoolName: "DSD" });
        const allAchievements = updatedSchoolData.achievement;

        return res.status(200).json({
            response: "success",
            result: allAchievements
        })
    } catch (error) {
        return res.status(500).json({
            response: "error",
            message: "Error updating achievement"
        })
    }
}

const handleDeleteAchievement = async (req, res) => {
    const { idx } = req.params;
    
    try {
        const schoolData = await SchoolSchema.findOne({ schoolName: "DSD" });

        if(!schoolData) {
            return res.status(404).json({
                response: "error",
                message: "Invalid school"
            })
        }

        const index = parseInt(idx);
        if(isNaN(index) || index < 0 || index >= schoolData.achievement.length) {
            return res.status(404).json({
                response: "error",
                message: "Invalid index"
            })
        }

        schoolData.achievement.splice(index, 1);
        await schoolData.save();

        const updatedSchoolData = await SchoolSchema.findOne({ schoolName: "DSD" });
        const allAchievements = updatedSchoolData.achievement;

        return res.status(200).json({
            response: "success",
            message: "Notice deleted",
            result: allAchievements
        })
    } catch (error) {
        return res.status(500).json({
            response: "error",
            message: "Error deleting achievement"
        })
    }
}

export {
    handleHeroSection,
    handleGetHomeHeroSection,
    handleAddNotice,
    handleUpdateNotice,
    handleGetNotices,
    handleDeleteNotice,
    handleAddNewAchievement,
    handleGetAllAchievements,
    handleUpdateAchievement,
    handleDeleteAchievement
}
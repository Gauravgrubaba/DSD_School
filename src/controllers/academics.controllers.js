import ClassSchema from "../models/class.models.js";
import SchoolSchema from "../models/school.models.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import { v2 as cloudinary } from "cloudinary";

const handleAddRoutine = async (req, res) => {
    const { id } = req.params;
    const { day, subject, time } = req.body;

    try {
        const pathToUpdate = `timeTable.${day}`;

        const result = await ClassSchema.findOneAndUpdate({ _id: id }, {
            $push: {
                [pathToUpdate]: {subjectName: subject, timing: time}
            }
        }, {
            new: true
        })

        return res.status(200).json({
            response: "success",
            result: result
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            response: "error",
            message: "Something went wrong while adding time table."
        })
    }
}

const handleCreateClass = async (req, res) => {
    const { className } = req.body;

    try {
        const classExist = await ClassSchema.findOne({ className: className });
        if(classExist) {
            return res.status(200).json({
                response: "success",
                classData: classExist
            })
        } else {
            const classExist = await ClassSchema.create({ className: className });
            return res.status(200).json({
                response: "success",
                classData: classExist
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            response: "error",
            message: "Something went wrong while fetching class"
        })
    }
}

const handleGetAllTimeTable = async (req, res) => {
    try {
        const result = await ClassSchema.find({});
        return res.status(200).json({
            response: "success",
            result: result
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            response: "error",
            message: "Something went wrong while loading time tables"
        })
    }
}

const handleDeleteClass = async (req, res) => {
    const { id } = req.params;
    
    try {
        await ClassSchema.findByIdAndDelete(id);

        const result = await ClassSchema.find({});

        return res.status(200).json({
            response: "success",
            message: "Class deleted",
            result: result
        })
    } catch (error) {
        return res.status(500).json({
            response: "error",
            message: "Something went wrong while deleting class"
        })
    }
}

const handleDeleteTimeTable = async (req, res) => {
    const { id, day, idx } = req.params;

    try {
        const existingClass = await ClassSchema.findById({ _id: id })

        if(!existingClass) {
            return res.status(404).json({
                response: "error",
                message: "Class doesn't exist"
            })
        }

        if(!existingClass.timeTable || !existingClass.timeTable[day]) {
            return res.status(404).json({
                response: "error",
                message: `Time Table for ${day} not exists.`
            })
        }

        if(idx >= existingClass.timeTable[day].length) {
            return res.status(404).json({
                response: "error",
                message: "Index out of bound"
            })
        }

        existingClass.timeTable[day].splice(idx, 1);
        existingClass.markModified('timeTable');

        const updatedData = await existingClass.save();

        return res.status(200).json({
            response: "success",
            result: updatedData
        })
    } catch (error) {
        return res.status(500).json({
            response: "error",
            message: "Something went wrong while deleting entry."
        })
    }
}

const handleAddHeroSection = async (req, res) => {
    const { text } = req.body;
    const file = req.file;

    try {
        let imgUrl = "";

        if(file) {
            const uploadResult = await uploadOnCloudinary(file.path);
            imgUrl = uploadResult?.secure_url || "";
        }

        const heroImageUpload = await SchoolSchema.findOneAndUpdate({ schoolName: "DSD" }, {
            $push: {
                heroSectionImage: imgUrl,
                heroImageText: text
            }
        }, {
            new: true
        })

        const dataToSend = {
            images: heroImageUpload.heroSectionImage,
            texts: heroImageUpload.heroImageText
        }

        return res.status(200).json({
            response: "success",
            result: dataToSend
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            response: "error",
            message: "Adding hero section image failed!"
        })
    }
}

const handleGetHeroSection = async (req, res) => {
    try {
        const heroSection = await SchoolSchema.findOne({ schoolName: "DSD" });

        const dataToSend = {
            images: heroSection.heroSectionImage,
            texts: heroSection.heroImageText
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

const handleDeleteHeroSectionImage = async (req, res) => {
    const { index } = req.params;
    
    try {
        const school = await SchoolSchema.findOne({ schoolName: "DSD" });

        if(index >= school?.heroSectionImage.length) {
            return res.status(404).json({
                response: "error",
                message: "Invalid index"
            })
        }

        const image = school?.heroSectionImage[index];
        
        if(image) {
            const segment = image.split('/');
            console.log(segment);
            const fileNameWithExtension = segment[segment.length - 1];
            const publicId = fileNameWithExtension.split('.')[0];
            const result = await cloudinary.uploader.destroy(publicId, { invalidate: true });
            console.log(result);
        }

        school?.heroSectionImage?.splice(index, 1);
        school?.heroImageText?.splice(index, 1);
        school.markModified('heroSectionImage', 'heroImageText');

        const updatedData = await school.save();

        const dataToSend = {
            images: updatedData.heroSectionImage,
            texts: updatedData.heroImageText
        }

        return res.status(200).json({
            response: "success",
            result: dataToSend
        })   
    } catch (error) {
        
    }
}

export {
    handleCreateClass,
    handleAddRoutine,
    handleGetAllTimeTable,
    handleDeleteClass,
    handleDeleteTimeTable,
    handleAddHeroSection,
    handleGetHeroSection,
    handleDeleteHeroSectionImage
}
import User from "../models/user.models.js";
import SchoolSchema from "../models/school.models.js";
import TeachersSchema from "../models/teachers.models.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import { v2 as cloudinary } from "cloudinary";

const handleUserlogin = async (req, res) => {
    const { school_id, password } = req.body;
    
    try {
        const userExist = await User.findOne({school_id: school_id});
        if(!userExist) {
            return res.status(404).json({
                response: "error",
                message: "User not found"
            })
        }

        const isPasswordValid = userExist.password === password;
        if(!isPasswordValid) {
            return res.status(404).json({
                response: "error",
                message: "Invalid password"
            })
        }

        return res.status(200).json({
            response: "success",
            data: {
                id: userExist.school_id
            }
        })
    } catch (error) {
        return res.status(404).json({
            response: "error",
            message: error
        })
    }
}

const handleAboutUsUpdate = async (req, res) => {
    const { title, description } = req.body;
    const file = req.file;

    try {
        const schoolAboutUs = await SchoolSchema.findOne({schoolName: "DSD"});
        
        if(file && schoolAboutUs?.aboutUs?.image) {
            const segment = schoolAboutUs.aboutUs.image.split('/');
            const fileWithoutExtension = segment[segment.length - 1];
            const publicId = fileWithoutExtension.split('.')[0];

            const result = await cloudinary.uploader.destroy(publicId, {invalidate: true});
        }

        let imgURL = ""

        if(file) {
            const uploadResult = await uploadOnCloudinary(file.path);
            imgURL = uploadResult?.secure_url || ""
        }

        const updatedData = {};
        if(title) updatedData["aboutUs.title"] = title;
        if(description) updatedData["aboutUs.description"] = description;
        if(imgURL) updatedData["aboutUs.image"] = imgURL;

        await SchoolSchema.findOneAndUpdate({schoolName: "DSD"}, {
            $set: updatedData
        }, {
            new: true
        });

        const data = await SchoolSchema.findOne({schoolName: "DSD"});

        return res.status(200).json({
            response: "success",
            updates: data
        })
    } catch (error) {
        return res.status(500).json({
            response: "error",
            message: "Something went wrong while updating..."
        })
    }
}

const handleGetAboutUs = async (req, res) => {
    try {
        const data = await SchoolSchema.findOne({schoolName: "DSD"});
        return res.status(200).json({
            response: "success",
            aboutUs: data.aboutUs
        })
    } catch (error) {
        return res.status(500).json({
            response: "error",
            message: "Something went wrong while fetching About us"
        })
    }
}

const handleAddTeacher = async(req, res) => {
    const { name, designation } = req.body;
    const file = req.file;

    try {
        let imgUrl = "";

        if(file) {
            const uploadResult = await uploadOnCloudinary(file.path);
            imgUrl = uploadResult?.secure_url || "";
        }

        const teacher = await TeachersSchema.create({ name: name, designation: designation, profileImage: imgUrl });

        console.log(teacher);

        return res.status(200).json({
            response: "success",
            message: "Teacher details added successfully",
            detail: teacher
        })
    } catch (error) {
        return res.status(500).json({
            response: "error",
            message: "Something went wrong while adding teacher details."
        })
    }
}

const handleGetAllTeachers = async(req, res) => {
    try {
        const teachers = await TeachersSchema.find({});
        return res.status(200).json({
            response: "success",
            allTeachers: teachers
        }) 
    } catch (error) {
        return res.send(500).json({
            response: "error",
            message: "Something went wrong while fetching teachers details"
        })
    }
}

const handleEditTeacher = async (req, res) => {
    const { id } = req.params;
    const { updatedName, updatedDesignation } = req.body;
    const file = req.file;

    console.log(file);
    
    try {
        const teacher = await TeachersSchema.findById({_id: id});

        if(file && teacher.profileImage) {
            const segment = teacher.profileImage.split('/');
            const fileNameWithExtension = segment[segment.length - 1];
            const publiId = fileNameWithExtension.split('.')[0];

            const result = await cloudinary.uploader.destroy(publiId, { invalidate: true });
        }

        let imgUrl = "";

        if(file) {
            const uplaodedFile = await uploadOnCloudinary(file.path);
            imgUrl = uplaodedFile?.secure_url || "";
        }
        
        const updatedData = {};
        if(updatedName) updatedData.name = updatedName;
        if(updatedDesignation) updatedData.designation = updatedDesignation;
        if(imgUrl) updatedData.profileImage = imgUrl

        const updatedTeacher = await TeachersSchema.findOneAndUpdate({_id: id}, updatedData, {new: true});
        return res.status(200).json({
            response: "success",
            message: "Teacher details updated successfully",
            teacherDetails: updatedTeacher
        })
    } catch (error) {
        return res.status(500).json({
            response: "error",
            message: "Something went wrong while updating teacher details"
        })
    }
}

const handleDeleteTeacher = async (req, res) => {
    const { id } = req.params;
    try {
        const teacher = await TeachersSchema.findById({ _id: id });

        if(teacher.profileImage) {
            const segment = teacher.profileImage.split('/');
            console.log(segment);
            const fileNameWithExtension = segment[segment.length - 1];
            const publicId = fileNameWithExtension.split('.')[0];
            const result = await cloudinary.uploader.destroy(publicId, { invalidate: true });
            console.log(result);
        }
        await TeachersSchema.findByIdAndDelete({ _id: id });
        const updatedTeachers = await TeachersSchema.find({});
        return res.status(200).json({
            response: "success",
            message: "Teacher details deleted",
            allTeachers: updatedTeachers
        })
    } catch (error) {
        return res.status(500).json({
            response: "error",
            message: "Something went wrong while deleting teacher details"
        })
    }
}

export {
    handleUserlogin,
    handleAboutUsUpdate,
    handleGetAboutUs,
    handleAddTeacher,
    handleGetAllTeachers,
    handleEditTeacher,
    handleDeleteTeacher
}
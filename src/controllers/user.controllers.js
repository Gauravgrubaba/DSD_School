import User from "../models/user.models.js";
import SchoolSchema from "../models/school.models.js";
import TeachersSchema from "../models/teachers.models.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

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

    try {
        const about = await SchoolSchema.findOneAndUpdate({schoolName: "DSD"}, {
            $set: {
                "aboutUs.title": title,
                "aboutUs.description": description
            }
        }, {
            new: true
        });

        return res.status(200).json({
            response: "success",
            updates: about
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
        console.log(data.aboutUs);
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
    const { id, updatedName, updatedDesignation } = req.body;
    
    try {
        await TeachersSchema.findOneAndUpdate({_id: id}, {
            name: updatedName,
            designation: updatedDesignation
        })
        return res.status(200).json({
            response: "success",
            message: "Teacher details updated successfully"
        })
    } catch (error) {
        return res.status(500).json({
            response: "error",
            message: "Something went wrong while updating teacher details"
        })
    }
}

// const handleProfilePictureUpload = (req, res) => {
//     console.log("Hellllloooooo")

//     console.log(req.body);
//     console.log(req.file);

//     return res.redirect('/');
// }

export {
    handleUserlogin,
    handleAboutUsUpdate,
    handleGetAboutUs,
    handleAddTeacher,
    handleGetAllTeachers,
    handleEditTeacher,
    // handleProfilePictureUpload
}
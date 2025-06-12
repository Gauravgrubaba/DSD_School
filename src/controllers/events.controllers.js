import SchoolSchema from "../models/school.models.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import { v2 as cloudinary } from "cloudinary";

const handleAddEvent = async (req, res) => {
    const { title, description } = req.body;
    const file = req.file;

    if(!title || !description) {
        return res.status(404).json({
            response: "error",
            message: "Event Title and Descriptions are required"
        })
    }

    if(!file) {
        return res.status(404).json({
            response: "error",
            message: "Event image is required"
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

        if(schoolData.events.length >= 10) {
            return res.status(404).json({
                response: "error",
                message: "Maximum 10 events are allowed"
            })
        }

        let imgUrl = "";
        const imgupload = await uploadOnCloudinary(file.path);
        imgUrl = imgupload.secure_url || "";

        schoolData.events.push({
            title: title,
            description: description,
            image: imgUrl
        });

        await schoolData.save();

        const updatedSchool = await SchoolSchema.findOne({ schoolName: "DSD" });
        const allEvents = updatedSchool.events;

        return res.status(200).json({
            response: "success",
            result: allEvents
        })
    } catch (error) {
        return res.status(500).json({
            response: "error",
            message: "Something went wrong while adding event"
        })
    }
}

const handleGetAllEvents = async (req, res) => {
    try {
        const school = await SchoolSchema.findOne({ schoolName: "DSD" });

        if(!school) {
            return res.status(404).json({
                response: "error",
                message: "School not found"
            })
        }

        const allEvents = school.events;

        return res.status(200).json({
            response: "success",
            result: allEvents
        })
    } catch (error) {
        return res.status(500).json({
            response: "error",
            message: "Error fetching events"
        })
    }
}

const handleDeleteEvent = async (req, res) => {
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
        if(isNaN(index) || index < 0 || index >= schoolData.events.length) {
            return res.status(404).json({
                response: "error",
                message: "Invalid Index"
            })
        }

        const image = schoolData.events[index].image;
        if(image) {
            const segment = image.split('/');
            const fileNameWithExtension = segment[segment.length - 1];
            const publicId = fileNameWithExtension.split('.')[0];
            const result = await cloudinary.uploader.destroy(publicId, { invalidate: true });
            console.log("Deleted image: ", result);
        }

        schoolData.events.splice(index, 1);
        await schoolData.save();

        const updatedSchoolData = await SchoolSchema.findOne({ schoolName: "DSD" });
        const allEvents = updatedSchoolData.events;

        return res.status(200).json({
            response: "success",
            result: allEvents
        })
    } catch (error) {
        return res.status(500).json({
            response: "error",
            message: "Something went wrong while deleting event"
        })
    }
}

const handleAddUpdateTagline = async (req, res) => {
    const { tagline } = req.body;
    
    if(!tagline) {
        return res.status(404).json({
            response: "error",
            message: "Tagline cannot be empty"
        })
    }

    try {
        const school = await SchoolSchema.findOne({ schoolName: "DSD" });

        if(!school) {
            return res.sta(404).json({
                response: "error",
                message: "School not found"
            })
        }

        school.eventTagline = tagline;
        const updatedSchool = await school.save();

        const updatedTagline = updatedSchool.eventTagline;
        
        return res.status(200).json({
            response: "success",
            result: updatedTagline
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            response: "error",
            message: "Error adding/updating tagline"
        })
    }
}

const handleGetTagline = async (req, res) => {
    try {
        const school = await SchoolSchema.findOne({ schoolName: "DSD" });
        if(!school) {
            return res.status(404).json({
                response: "error",
                message: "School not found"
            })
        }

        const tagline = school.eventTagline;

        return res.status(200).json({
            response: "success",
            result: tagline
        })
    } catch (error) {
        return res.status(500).json({
            response: "error",
            message: "Error fetching tagline"
        })
    }
}

export {
    handleAddEvent,
    handleGetAllEvents,
    handleDeleteEvent,
    handleAddUpdateTagline,
    handleGetTagline
}
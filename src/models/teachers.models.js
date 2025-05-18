import mongoose from "mongoose";

const teachersSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"]
        }, 
        designation: {
            type: String,
            required: [true, "Designation is required"]
        },
        profileImage: {
            type: String
        }
    }
)

const TeachersSchema = mongoose.model("teachers", teachersSchema);

export default TeachersSchema;
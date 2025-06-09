import mongoose from "mongoose";

const managementSchema = new mongoose.Schema(
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

const Management = mongoose.model("management", managementSchema);

export default Management;
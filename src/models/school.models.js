import mongoose from "mongoose";

const schoolSchema = new mongoose.Schema(
    {
        schoolName: {
            type: String,
            default: "DSD",
            unique: true
        },
        tagline: {
            type: String
        },
        aboutUs: {
            title: {
                type: String,
                required: [true, "Title is required"]
            },
            description: {
                type: String
            },
            image: {
                type: String,
            }
        }
    }, {
        timestamps: true
    }
);

const SchoolSchema = mongoose.model("schoolSchema", schoolSchema);

export default SchoolSchema;